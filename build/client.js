'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _fluxibleAddonsReactFluxibleComponent = require('fluxible-addons-react/FluxibleComponent');

var _fluxibleAddonsReactFluxibleComponent2 = _interopRequireDefault(_fluxibleAddonsReactFluxibleComponent);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _flux = require('./flux');

var _flux2 = _interopRequireDefault(_flux);

var log = (0, _debug2['default'])('fou:client');

window.addEventListener('DOMContentLoaded', function () {
  window.Debug = _debug2['default'];

  log('rehydrating from window.__dehydratedState');
  _flux2['default'].rehydrate(window.__dehydratedState, function (err, context) {
    if (err) {
      return log(err);
    }

    log('rendering root');
    _reactRouter2['default'].run(_flux2['default'].getComponent(), _reactRouter2['default'].HistoryLocation, function (Handler, state) {
      var Root = _react2['default'].createElement(
        _fluxibleAddonsReactFluxibleComponent2['default'],
        { context: context.getComponentContext() },
        _react2['default'].createElement(Handler, null)
      );

      _react2['default'].render(Root, document.getElementById('app'), function () {
        return log('rendered ' + state.pathname);
      });
    });
  });
});