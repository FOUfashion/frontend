'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _fluxibleAddonsReactFluxibleComponent = require('fluxible-addons-react/FluxibleComponent');

var _fluxibleAddonsReactFluxibleComponent2 = _interopRequireDefault(_fluxibleAddonsReactFluxibleComponent);

var _reactDocumentTitle = require('react-document-title');

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _flux = require('../flux');

var _flux2 = _interopRequireDefault(_flux);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var indexView = require('../views/index.hbs');
var router = new _koaRouter2['default']({ prefix: '/' });
var log = (0, _debug2['default'])('fou:server:root');
var assets = {};

if (process.env.NODE_ENV === 'production') {
  _fs2['default'].readFile(_path2['default'].join(__dirname, 'webpack-assets.json'), 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }

    assets = JSON.parse(data).main;
  });
}

router.get('*', _regeneratorRuntime.mark(function callee$0$0() {
  var _ref, _ref2, Handler, state, context, dehydratedState, Root;

  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return new _Promise(function (resolve) {
          log('running router');
          _reactRouter2['default'].run(_flux2['default'].getComponent(), _this.url, function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return resolve(args);
          });
        });

      case 2:
        _ref = context$1$0.sent;
        _ref2 = _slicedToArray(_ref, 2);
        Handler = _ref2[0];
        state = _ref2[1];

        if (state.routes.filter(function (route) {
          return route.isNotFound;
        }).length) {
          this.status = 404;
        }

        log('serializing dehydrated flux state');
        context = _flux2['default'].createContext();
        dehydratedState = (0, _serializeJavascript2['default'])(_flux2['default'].dehydrate(context));

        log('rendering html');
        Root = _react2['default'].createElement(
          _fluxibleAddonsReactFluxibleComponent2['default'],
          { context: context.getComponentContext() },
          _react2['default'].createElement(Handler, null)
        );

        this.body = indexView({
          body: _react2['default'].renderToString(Root),
          script: 'window.__dehydratedState = ' + dehydratedState + ';',
          title: _reactDocumentTitle2['default'].rewind(),
          jsBundle: assets.js || 'http://localhost:8080/bundle.js',
          cssBundle: assets.css || 'http://localhost:8080/styles.css'
        });

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}));

exports['default'] = router;
module.exports = exports['default'];