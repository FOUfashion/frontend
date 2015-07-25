'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('normalize.css/normalize.css');

require('./styles.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _decoratorsMuiTheme = require('../../decorators/muiTheme');

var _decoratorsMuiTheme2 = _interopRequireDefault(_decoratorsMuiTheme);

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, _App);

    _get(Object.getPrototypeOf(_App.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(_reactRouter.RouteHandler, null);
    }
  }]);

  var _App = App;
  App = (0, _decoratorsMuiTheme2['default'])(App) || App;
  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];