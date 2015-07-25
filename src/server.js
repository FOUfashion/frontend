import koa from 'koa';
import serve from 'koa-static';
import logger from 'koa-logger';
import debug from 'debug';

const server = koa();
const log = debug('fou:server');

// Log requests
server.use(logger());

// Serve files from the public folder
log('serving from ./public');
server.use(serve('./public', { defer: false }));

// Register routes
log('registering routes');
const routers = [
  require('./api/counter'),
  require('./api/root')
];

routers.forEach(function(router) {
  log(router.opts.prefix);
  server.use(router.routes());
  server.use(router.allowedMethods());
});

// Start listening
const port = process.env.PORT || 9090;
const host = '0.0.0.0';

server.listen(port, host, function() {
  console.log('Listening on http://%s:%s', host, port);
});
