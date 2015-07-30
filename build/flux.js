'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fluxible = require('fluxible');

var _fluxible2 = _interopRequireDefault(_fluxible);

var _storesAppStore = require('./stores/AppStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

var app = new _fluxible2['default']({
  stores: [_storesAppStore2['default']]
});

// FIXME: This is a workaround because on SSR the context doesn't
// propagate from FluxibleComponent on to e.g. TopBar component
app.ctx = app.createContext();

exports['default'] = app;
module.exports = exports['default'];