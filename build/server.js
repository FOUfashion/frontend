'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _packageJson = require('../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaProxy = require('koa-proxy');

var _koaProxy2 = _interopRequireDefault(_koaProxy);

var _koaGenericSession = require('koa-generic-session');

var _koaGenericSession2 = _interopRequireDefault(_koaGenericSession);

var _koaRedis = require('koa-redis');

var _koaRedis2 = _interopRequireDefault(_koaRedis);

var server = (0, _koa2['default'])();
var log = (0, _debug2['default'])('fou:server');

// Meta
server.name = _packageJson2['default'].name;
server.keys = process.env.FRONTEND_SESSION_KEYS.split(',');

// Log requests
server.use((0, _koaLogger2['default'])());

// Serve files from the public folder
var publicPath = __DEV__ ? './public' : './dist/public';
log('serving from %s', publicPath);
server.use((0, _koaStatic2['default'])(publicPath, { defer: false }));

// Session config
server.use((0, _koaGenericSession2['default'])({
  store: (0, _koaRedis2['default'])({
    host: process.env.FRONTEND_REDIS_HOST,
    port: process.env.FRONTEND_REDIS_PORT
  })
}));

// API proxy
var FIRST_PARTY_REQUESTS = {
  GET: [/^\/account\/\w+$/, /^\/profile$/],
  POST: [/^\/account$/]
};

var checkRoute = function checkRoute() {
  var exps = FIRST_PARTY_REQUESTS[this.method];

  if (exps) {
    for (var i = 0; i < exps.length; i++) {
      var exp = exps[i];
      if (exp.test(this.path)) {
        return process.env.FRONTEND_API_TOKEN;
      }
    }
  }
};

server.use((0, _koaMount2['default'])('/api', _regeneratorRuntime.mark(function callee$0$0(next) {
  var token;
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        token = checkRoute.call(this) || this.session.api_token;

        if (!process.env.FRONTEND_SIMULATE_DELAY) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 4;
        return new _Promise(function (resolve) {
          return setTimeout(resolve, 500);
        });

      case 4:

        this.header.authorization = 'Bearer ' + token;
        return context$1$0.delegateYield(next, 't0', 6);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
})));

server.use((0, _koaMount2['default'])('/api', (0, _koaProxy2['default'])({
  host: process.env.FRONTEND_API_URI
})));

// Register routes
log('registering routes');
var routers = [require('./api/root')];

routers.forEach(function (router) {
  log(router.opts.prefix);
  server.use(router.routes());
  server.use(router.allowedMethods());
});

// Start listening
var port = process.env.FRONTEND_PORT || 9090;
var host = '0.0.0.0';

server.listen(port, host, function () {
  console.log('Listening on http://%s:%s', host, port);
});

// Simulate delay