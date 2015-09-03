'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _actionsAppActions = require('./actions/AppActions');

var AppActions = _interopRequireWildcard(_actionsAppActions);

var _storesAppStore = require('./stores/AppStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _pagesLoginPage = require('./pages/LoginPage');

var _pagesLoginPage2 = _interopRequireDefault(_pagesLoginPage);

var _pagesRegisterPage = require('./pages/RegisterPage');

var _pagesRegisterPage2 = _interopRequireDefault(_pagesRegisterPage);

var _pagesFeedPage = require('./pages/FeedPage');

var _pagesFeedPage2 = _interopRequireDefault(_pagesFeedPage);

var _pagesLandingPage = require('./pages/LandingPage');

var _pagesLandingPage2 = _interopRequireDefault(_pagesLandingPage);

var _pagesNotFoundPage = require('./pages/NotFoundPage');

var _pagesNotFoundPage2 = _interopRequireDefault(_pagesNotFoundPage);

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var log = (0, _debug2['default'])('fou:routes');

function routes(context) {
  function requireLoggedIn(nextState, transition) {
    if (!context.getStore(_storesAppStore2['default']).isSignedIn()) {
      log('not signed in, redirecting to /login');
      transition.to('/login');
    }
  }

  function requireLoggedOut(nextState, transition) {
    if (context.getStore(_storesAppStore2['default']).isSignedIn()) {
      log('already signed in, redirecting to /feed');
      transition.to('/feed');
    }
  }

  function doLogOut(nextState, transition) {
    return _regeneratorRuntime.async(function doLogOut$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          log('signed out, redirecting');
          transition.to('/');

          context$2$0.prev = 2;

          log('signed out, executing action');
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(context.executeAction(AppActions.userSignedOut));

        case 6:
          if (__SERVER__) {
            context$2$0.next = 11;
            break;
          }

          log('signed out, notifying server...');
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].head('/logout').promise());

        case 10:
          log('signed out, logged out from server too');

        case 11:
          context$2$0.next = 16;
          break;

        case 13:
          context$2$0.prev = 13;
          context$2$0.t0 = context$2$0['catch'](2);

          log('signed out, unexpected error', context$2$0.t0);

        case 16:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[2, 13]]);
  }

  return _react2['default'].createElement(
    _reactRouter.Route,
    { component: _componentsApp2['default'] },
    _react2['default'].createElement(_reactRouter.Route, { path: '/', component: _pagesLandingPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: '/login', component: _pagesLoginPage2['default'], onEnter: requireLoggedOut }),
    _react2['default'].createElement(_reactRouter.Route, { path: '/register', component: _pagesRegisterPage2['default'], onEnter: requireLoggedOut }),
    _react2['default'].createElement(_reactRouter.Route, { path: '/logout', onEnter: doLogOut }),
    _react2['default'].createElement(_reactRouter.Route, { path: '/feed', component: _pagesFeedPage2['default'], onEnter: requireLoggedIn }),
    _react2['default'].createElement(_reactRouter.Route, { path: '*', component: _pagesNotFoundPage2['default'] })
  );
}

routes.onError = function (error) {
  log('unexpected error', error);
};

exports['default'] = routes;
module.exports = exports['default'];