'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fluxible = require('fluxible');

var _fluxible2 = _interopRequireDefault(_fluxible);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _storesAppStore = require('./stores/AppStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

exports['default'] = new _fluxible2['default']({
  component: _router2['default'],
  stores: [_storesAppStore2['default']]
});
module.exports = exports['default'];