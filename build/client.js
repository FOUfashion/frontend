'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

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

// Load the app
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
        _react2['default'].createElement(Handler, state)
      );

      _react2['default'].render(Root, document.getElementById('app'), function () {
        return log('rendered ' + state.pathname);
      });
    });
  });
});

// Loader animation
var loaderElem = document.getElementById('loader');
var appElem = document.getElementById('app');

if (loaderElem) {
  appElem.style.overflow = 'hidden';

  _Promise.all([new _Promise(function (resolve) {
    return window.onload = resolve;
  }), new _Promise(function (mainResolve) {
    _Promise.all([new _Promise(function (resolve) {
      return setTimeout(resolve, 500);
    }), new _Promise(function (resolve) {
      return window.addEventListener('DOMContentLoaded', resolve);
    })]).then(function () {
      loaderElem.classList.add('animated');
      setTimeout(mainResolve, 1500);
    });
  })]).then(function () {
    loaderElem.classList.add('hide');
    appElem.style.overflow = 'auto';
  });
}