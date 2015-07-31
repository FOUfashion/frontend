'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

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

var _actionsAppActions = require('../actions/AppActions');

var AppActions = _interopRequireWildcard(_actionsAppActions);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterLibLocation = require('react-router/lib/Location');

var _reactRouterLibLocation2 = _interopRequireDefault(_reactRouterLibLocation);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _flux = require('../flux');

var _flux2 = _interopRequireDefault(_flux);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _viewsIndexHbs = require('../views/index.hbs');

var _viewsIndexHbs2 = _interopRequireDefault(_viewsIndexHbs);

var _cssMinimizeAutoprefixerSassSassInlineScss = require('!!css?minimize!autoprefixer!sass!../sass/inline.scss');

var _cssMinimizeAutoprefixerSassSassInlineScss2 = _interopRequireDefault(_cssMinimizeAutoprefixerSassSassInlineScss);

var router = new _koaRouter2['default']({ prefix: '/' });
var log = (0, _debug2['default'])('fou:server:root');
var assets = {};

if (!__DEV__) {
  log('reading asset names');
  _fs2['default'].readFile(_path2['default'].join(__dirname, 'webpack-assets.json'), 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }

    assets = JSON.parse(data).main;
  });
}

router.head('/logout', _regeneratorRuntime.mark(function callee$0$0() {
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        log('purging session');
        this.session = null;
        this.status = 204;

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}));

router.get('*', _regeneratorRuntime.mark(function callee$0$0() {
  var context, componentContext, account, _ref, _ref2, initialState, transition, dehydratedState, Root;

  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context = _flux2['default'].ctx;
        componentContext = context.getComponentContext();

        if (!(this.path === '/logout')) {
          context$1$0.next = 7;
          break;
        }

        log('purging session');
        this.session = null;
        context$1$0.next = 19;
        break;

      case 7:
        log('initializing flux state');

        // Get the account if a token is saved in the session

        if (!this.session.apiToken) {
          context$1$0.next = 16;
          break;
        }

        log('retrieving user account');

        context$1$0.next = 12;
        return (0, _requestPromise2['default'])({
          method: 'GET',
          baseUrl: process.env.FRONTEND_API_URI,
          url: '/account',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.session.apiToken
          },
          json: true
        });

      case 12:
        account = context$1$0.sent;

        this.session.account = account;
        context$1$0.next = 17;
        break;

      case 16:
        log('no user token');

      case 17:
        context$1$0.next = 19;
        return context.executeAction(AppActions.serverInit, {
          account: this.session.account
        });

      case 19:

        log('running router');
        context$1$0.next = 22;
        return new _Promise(function (resolve, reject) {
          var location = new _reactRouterLibLocation2['default'](_this.path, _this.query);
          var callback = function callback(error) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return error ? reject(error) : resolve(args);
          };
          _reactRouter2['default'].run((0, _routes2['default'])(componentContext), location, callback);
        });

      case 22:
        _ref = context$1$0.sent;
        _ref2 = _slicedToArray(_ref, 2);
        initialState = _ref2[0];
        transition = _ref2[1];

        if (!transition.isCancelled) {
          context$1$0.next = 31;
          break;
        }

        this.redirect(transition.redirectInfo.pathname);
        return context$1$0.abrupt('return');

      case 31:
        if (!initialState) {
          this.status = 404;
        }

      case 32:
        log('serializing dehydrated flux state');
        dehydratedState = (0, _serializeJavascript2['default'])(_flux2['default'].dehydrate(context));

        log('rendering html');
        Root = _react2['default'].createElement(
          _fluxibleAddonsReactFluxibleComponent2['default'],
          { context: componentContext },
          _react2['default'].createElement(_reactRouter2['default'], initialState)
        );

        this.body = (0, _viewsIndexHbs2['default'])({
          body: _react2['default'].renderToString(Root),
          script: 'window.__dehydratedState = ' + dehydratedState + ';',
          title: _reactDocumentTitle2['default'].rewind(),
          showPreloader: this.path === '/',
          jsBundle: assets.js || 'http://' + (process.env.FRONTEND_HOSTNAME || '0.0.0.0') + ':' + (process.env.FRONTEND_WP_PORT || 8080) + '/bundle.js',
          cssBundle: assets.css,
          inlineCss: _cssMinimizeAutoprefixerSassSassInlineScss2['default']
        });

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}));

exports['default'] = router;
module.exports = exports['default'];
//createContext();

// Handle redirection or not found