'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.userSignedIn = userSignedIn;
exports.userSignedOut = userSignedOut;
exports.serverInit = serverInit;

var _constantsActionTypes = require('../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var log = (0, _debug2['default'])('fou:AppActions');

function userSignedIn(actionContext, account) {
  return _regeneratorRuntime.async(function userSignedIn$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        log('userSignedIn');
        actionContext.dispatch(_constantsActionTypes2['default'].USER_SIGNED_IN, _immutable2['default'].fromJS(account));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function userSignedOut(actionContext) {
  return _regeneratorRuntime.async(function userSignedOut$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        log('userSignedOut');
        actionContext.dispatch(_constantsActionTypes2['default'].USER_SIGNED_OUT);

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function serverInit(actionContext, state) {
  return _regeneratorRuntime.async(function serverInit$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        log('serverInit');

        if (!state.account) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(actionContext.executeAction(userSignedIn, state.account));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}