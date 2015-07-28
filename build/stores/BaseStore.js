'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fluxibleAddonsBaseStore = require('fluxible/addons/BaseStore');

var _fluxibleAddonsBaseStore2 = _interopRequireDefault(_fluxibleAddonsBaseStore);

var BaseStore = (function (_FluxibleBaseStore) {
  _inherits(BaseStore, _FluxibleBaseStore);

  function BaseStore(dispatcher) {
    _classCallCheck(this, BaseStore);

    _get(Object.getPrototypeOf(BaseStore.prototype), 'constructor', this).call(this, dispatcher);
    this.state = {};
  }

  _createClass(BaseStore, [{
    key: 'dehydrate',
    value: function dehydrate() {
      return this.state;
    }
  }, {
    key: 'rehydrate',
    value: function rehydrate(state) {
      _Object$assign(this.state, state);
    }
  }]);

  return BaseStore;
})(_fluxibleAddonsBaseStore2['default']);

exports['default'] = BaseStore;
module.exports = exports['default'];