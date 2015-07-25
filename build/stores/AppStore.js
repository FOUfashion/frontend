'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fluxibleAddonsBaseStore = require('fluxible/addons/BaseStore');

var _fluxibleAddonsBaseStore2 = _interopRequireDefault(_fluxibleAddonsBaseStore);

var AppStore = (function (_BaseStore) {
  _inherits(AppStore, _BaseStore);

  _createClass(AppStore, null, [{
    key: 'storeName',
    value: 'AppStore',
    enumerable: true
  }, {
    key: 'handlers',
    value: {
      'INCREMENT': 'increment',
      'DECREMENT': 'decrement'
    },
    enumerable: true
  }]);

  function AppStore(dispatcher) {
    _classCallCheck(this, AppStore);

    _get(Object.getPrototypeOf(AppStore.prototype), 'constructor', this).call(this, dispatcher);
    this.count = 0;
  }

  _createClass(AppStore, [{
    key: 'increment',
    value: function increment() {
      this.count++;
      this.emitChange();
    }
  }, {
    key: 'decrement',
    value: function decrement() {
      this.count--;
      this.emitChange();
    }
  }, {
    key: 'getCount',
    value: function getCount() {
      return this.count;
    }
  }, {
    key: 'dehydrate',
    value: function dehydrate() {
      return {
        count: this.count
      };
    }
  }, {
    key: 'rehydrate',
    value: function rehydrate(state) {
      this.count = state.count;
    }
  }]);

  return AppStore;
})(_fluxibleAddonsBaseStore2['default']);

exports['default'] = AppStore;
module.exports = exports['default'];