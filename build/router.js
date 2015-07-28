'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

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

exports['default'] = _react2['default'].createElement(
  _reactRouter.Route,
  { path: "/", handler: _componentsApp2['default'] },
  _react2['default'].createElement(_reactRouter.Route, { path: "login", handler: _pagesLoginPage2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: "register", handler: _pagesRegisterPage2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: "feed", handler: _pagesFeedPage2['default'] }),
  _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _pagesLandingPage2['default'] }),
  _react2['default'].createElement(_reactRouter.NotFoundRoute, { handler: _pagesNotFoundPage2['default'] })
);
module.exports = exports['default'];