'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fluxibleAddonsReactConnectToStores = require('fluxible-addons-react/connectToStores');

/**
 * Helper to easily "connect" a component to several Fluxible stores.
 */

var _fluxibleAddonsReactConnectToStores2 = _interopRequireDefault(_fluxibleAddonsReactConnectToStores);

function connectToStoresDecorator(stores, callback) {
  return (0, _fluxibleAddonsReactConnectToStores2['default'])(stores, function (context, props) {
    var args = [props, context];

    stores.forEach(function (store) {
      args.unshift(context.getStore(store));
    });

    return callback.apply(null, args);
  });
}

exports['default'] = connectToStoresDecorator;
module.exports = exports['default'];