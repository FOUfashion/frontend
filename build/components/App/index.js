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

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _timeoutTransitionGroup = require('timeout-transition-group');

var _timeoutTransitionGroup2 = _interopRequireDefault(_timeoutTransitionGroup);

var _decoratorsMuiTheme = require('../../decorators/muiTheme');

var _decoratorsMuiTheme2 = _interopRequireDefault(_decoratorsMuiTheme);

var _decoratorsMuiPalette = require('../../decorators/muiPalette');

var _decoratorsMuiPalette2 = _interopRequireDefault(_decoratorsMuiPalette);

var _stylingPalette = require('../../styling/palette');

var _stylingPalette2 = _interopRequireDefault(_stylingPalette);

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, _App);

    _get(Object.getPrototypeOf(_App.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _timeoutTransitionGroup2['default'],
        { enterTimeout: 600, leaveTimeout: 400, transitionName: "routerTransition", className: _stylesScss2['default'].app },
        _react2['default'].createElement(_reactRouter.RouteHandler, { key: this.props.path })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      path: _react.PropTypes.string
    },
    enumerable: true
  }]);

  var _App = App;
  App = (0, _decoratorsMuiPalette2['default'])(_stylingPalette2['default'])(App) || App;
  App = (0, _decoratorsMuiTheme2['default'])(App) || App;
  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];