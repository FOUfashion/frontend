import manifest from '../package.json';
import debug from 'debug';

import koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';

import mount from 'koa-mount';
import proxy from 'koa-proxy';

import session from 'koa-generic-session';
import redis from 'koa-redis';

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

// API proxy
const FP_REQUESTS = {
  GET: ['/profile'],
  POST: ['/account']
};

server.use(mount('/api', function *(next) {
  let token = this.session.api_token;

  if (FP_REQUESTS[this.method] && FP_REQUESTS[this.method].indexOf(this.path) !== -1) {
    token = process.env.FRONTEND_API_TOKEN;
  }

  // Simulate delay
  if (process.env.FRONTEND_SIMULATE_DELAY) {
    yield new Promise(resolve => setTimeout(resolve, 1500));
  }

  this.header.authorization = `Bearer ${token}`;
  yield* next;
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
