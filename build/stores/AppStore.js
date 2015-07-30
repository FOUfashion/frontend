'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _constantsActionTypes = require('../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var _BaseStore2 = require('./BaseStore');

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var AppStore = (function (_BaseStore) {
  var _value;

  _inherits(AppStore, _BaseStore);

  function AppStore() {
    _classCallCheck(this, AppStore);

    _get(Object.getPrototypeOf(AppStore.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(AppStore, [{
    key: '_userSignedIn',
    value: function _userSignedIn(account) {
      this.state.account = account;
      this.state.isSignedIn = true;
      this.emitChange();
    }
  }, {
    key: '_userSignedOut',
    value: function _userSignedOut() {
      this.state.account = undefined;
      this.state.isSignedIn = false;
      this.emitChange();
    }
  }, {
    key: 'getAccount',
    value: function getAccount() {
      return this.state.account;
    }
  }, {
    key: 'isSignedIn',
    value: function isSignedIn() {
      return !!this.state.isSignedIn;
    }
  }], [{
    key: 'storeName',
    value: 'AppStore',
    enumerable: true
  }, {
    key: 'handlers',
    value: (_value = {}, _defineProperty(_value, _constantsActionTypes2['default'].USER_SIGNED_IN, '_userSignedIn'), _defineProperty(_value, _constantsActionTypes2['default'].USER_SIGNED_OUT, '_userSignedOut'), _value),
    enumerable: true
  }]);

  return AppStore;
})(_BaseStore3['default']);

exports['default'] = AppStore;
module.exports = exports['default'];