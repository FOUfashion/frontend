'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var server = (0, _koa2['default'])();
var log = (0, _debug2['default'])('fou:server');

// Log requests
server.use((0, _koaLogger2['default'])());

// Serve files from the public folder
log('serving from ./public');
server.use((0, _koaStatic2['default'])('./public', { defer: false }));

// Register routes
log('registering routes');
var routers = [require('./api/counter'), require('./api/root')];

routers.forEach(function (router) {
  log(router.opts.prefix);
  server.use(router.routes());
  server.use(router.allowedMethods());
});

// Start listening
var port = process.env.PORT || 9090;
server.listen(port, function () {
  console.log('Listening on http://localhost:%s', port);
});