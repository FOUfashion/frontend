'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$entries = require('babel-runtime/core-js/object/entries')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fluxibleAddonsBaseStore = require('fluxible/addons/BaseStore');

var _fluxibleAddonsBaseStore2 = _interopRequireDefault(_fluxibleAddonsBaseStore);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

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
      var _this = this;

      _Object$entries(state).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var k = _ref2[0];
        var v = _ref2[1];

        _this.state[k] = _immutable2['default'].fromJS(v);
      });
    }
  }]);

  return BaseStore;
})(_fluxibleAddonsBaseStore2['default']);

exports['default'] = BaseStore;
module.exports = exports['default'];