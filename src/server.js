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
server.keys = process.env.FRONTEND_SESSION_KEYS ? process.env.FRONTEND_SESSION_KEYS.split(',') : ['123'];

// Log requests
server.use(logger());

// Serve files from the public folder
const publicPath = __DEV__ ? './public' : './dist/public';
log('serving from %s', publicPath);
server.use(serve(publicPath, { defer: false }));

// Session config
server.use(session({
  store: process.env.FRONTEND_REDIS_HOST ? redis({
    host: process.env.FRONTEND_REDIS_HOST,
    port: process.env.FRONTEND_REDIS_PORT
  }) : undefined
}));

// Parse body
server.use(jsonBody({
  limit: '10kb'
}));

// API proxy
const FIRST_PARTY_REQUESTS = {
  GET: [/^\/account\/\w+$/, /^\/profile\/.*/],
  POST: [/^\/account$/, /^\/login$/]
};

// Check the route to decide whether the FP token should be used
const checkRoute = function() {
  log('checking route');
  const exps = FIRST_PARTY_REQUESTS[this.method];

  if (exps) {
    for (let i = 0; i < exps.length; i++) {
      const exp = exps[i];

      if (exp.test(this.path)) {
        log('found match, using FP token', this.path);
        return process.env.FRONTEND_API_TOKEN;
      }
    }
  }
};

// Exchange the user's credentials for a token to be used in future requests
function* exchangeCredentials(fpToken) {
  log('exchanging credentials for token');

  const result = yield request({
    method: 'POST',
    baseUrl: process.env.FRONTEND_API_URI,
    url: '/oauth/exchange/credentials',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${fpToken}`
    },
    json: {
      username: this.request.body.username,
      password: this.request.body.password
    }
  });

  this.session.apiToken = result.value;
  log('got token', result.value.substr(0, 6) + '...');
}

server.use(mount('/api', function *(next) {
  const requestToken = checkRoute.call(this) || this.session.apiToken;
  log('proxying', this.method, this.path);

  // Simulate delay
  if (process.env.FRONTEND_SIMULATE_DELAY) {
    yield new Promise(resolve => setTimeout(resolve, 500));
  }

  this.header.accept = 'application/json';
  this.header.authorization = `Bearer ${requestToken}`;

  yield* next;

  // Exchange token
  if (this.method === 'POST') {
    // Registration
    if (this.path === '/account' && this.status === 201) {
      yield exchangeCredentials.call(this, requestToken);
    }

    // Login
    if (this.path === '/login' && this.status === 200) {
      yield exchangeCredentials.call(this, requestToken);
    }
  }
}));

server.use(mount('/api', proxy({
  host: process.env.FRONTEND_API_URI || 'http://localhost:5000'
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
const port = process.env.FRONTEND_PORT || process.env.PORT || 9090;
const host = '0.0.0.0';

server.listen(port, host, function() {
  console.log(`Listening on ${host}:${port}`);
});
