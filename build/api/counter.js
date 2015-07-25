'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var router = new _koaRouter2['default']({ prefix: '/counter' });
var count = 0;

router.get('/', _regeneratorRuntime.mark(function callee$0$0() {
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = count;

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}));

router.post('/increment', _regeneratorRuntime.mark(function callee$0$0() {
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = ++count;

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}));

router.post('/decrement', _regeneratorRuntime.mark(function callee$0$0() {
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.body = --count;

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}));

exports['default'] = router;
module.exports = exports['default'];