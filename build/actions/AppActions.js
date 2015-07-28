'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = userSignedIn;

var _constantsActionTypes = require('../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

function userSignedIn(actionContext, account) {
  return _regeneratorRuntime.async(function userSignedIn$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        actionContext.dispatch(_constantsActionTypes2['default'].USER_SIGNED_IN, account);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

module.exports = exports['default'];