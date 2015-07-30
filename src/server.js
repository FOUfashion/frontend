import manifest from '../package.json';
import request from 'request-promise';
import debug from 'debug';

import koa from 'koa';
import serve from 'koa-static';
import logger from 'koa-logger';
import jsonBody from 'koa-json-body';
import session from 'koa-generic-session';
import redis from 'koa-redis';
import mount from 'koa-mount';
import proxy from 'koa-proxy';

const server = koa();
const log = debug('fou:server');

// Meta
server.name = manifest.name;
server.keys = process.env.FRONTEND_SESSION_KEYS.split(',');

// Log requests
server.use(logger());

// Serve files from the public folder
const publicPath = __DEV__ ? './public' : './dist/public';
log('serving from %s', publicPath);
server.use(serve(publicPath, { defer: false }));

// Session config
server.use(session({
  store: redis({
    host: process.env.FRONTEND_REDIS_HOST,
    port: process.env.FRONTEND_REDIS_PORT
  })
}));

// Parse body
server.use(jsonBody({
  limit: '10kb'
}));

// API proxy
const FIRST_PARTY_REQUESTS = {
  GET: [/^\/account\/\w+$/, /^\/profile$/],
  POST: [/^\/account$/, /^\/login$/]
};

const checkRoute = function() {
  const exps = FIRST_PARTY_REQUESTS[this.method];

  if (exps) {
    for (let i = 0; i < exps.length; i++) {
      const exp = exps[i];
      if (exp.test(this.path)) {
        return process.env.FRONTEND_API_TOKEN;
      }
    }
  }
};

server.use(mount('/api', function *(next) {
  const requestToken = checkRoute.call(this) || this.session.api_token;
  log('proxying', this.method, this.path);

  // Simulate delay
  if (process.env.FRONTEND_SIMULATE_DELAY) {
    yield new Promise(resolve => setTimeout(resolve, 500));
  }

  this.header.accept = 'application/json';
  this.header.authorization = `Bearer ${requestToken}`;

  yield* next;

  // Exchange token
  if (this.method === 'POST' && this.path === '/account' && this.status === 201) {
    log('exchanging credentials for token');

    const result = yield request({
      method: 'POST',
      baseUrl: process.env.FRONTEND_API_URI,
      url: '/oauth/exchange/credentials',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${requestToken}`
      },
      json: {
        username: this.request.body.username,
        password: this.request.body.password
      }
    });

    const userToken = result.value;
    log('got token', userToken.substr(0, 6) + '...');

    // Get the account object
    const account = yield request({
      method: 'GET',
      baseUrl: process.env.FRONTEND_API_URI,
      url: '/account',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      json: true
    });

    log('token owned by account', account, userToken);
    this.session.account = account;

    // Get the profile
    const profile = yield request({
      method: 'GET',
      baseUrl: process.env.FRONTEND_API_URI,
      url: '/profile/' + encodeURIComponent(this.request.body.email),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      json: true
    });

    log('token owned by profile', profile);
    this.session.account.profile = profile;
  }
}));

server.use(mount('/api', proxy({
  host: process.env.FRONTEND_API_URI
})));

// Register routes
log('registering routes');
const routers = [
  require('./api/root')
];

routers.forEach(function(router) {
  log(router.opts.prefix);
  server.use(router.routes());
  server.use(router.allowedMethods());
});

// Start listening
const port = process.env.FRONTEND_PORT || 9090;
const host = '0.0.0.0';

server.listen(port, host, function() {
  console.log('Listening on http://%s:%s', host, port);
});
