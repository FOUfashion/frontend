'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _materialUi2 = _interopRequireDefault(_materialUi);

function muiTheme(ComposedComponent) {
  var MuiThemeDecorator = (function (_ComposedComponent) {
    _inherits(MuiThemeDecorator, _ComposedComponent);

    function MuiThemeDecorator() {
      _classCallCheck(this, MuiThemeDecorator);

      _get(Object.getPrototypeOf(MuiThemeDecorator.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MuiThemeDecorator, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = _get(Object.getPrototypeOf(MuiThemeDecorator.prototype), 'getChildContext', this) && _get(Object.getPrototypeOf(MuiThemeDecorator.prototype), 'getChildContext', this).call(this) || {};
        context.muiTheme = new _materialUi2['default'].Styles.ThemeManager().getCurrentTheme();
        return context;
      }
    }]);

    return MuiThemeDecorator;
  })(ComposedComponent);

  MuiThemeDecorator.childContextTypes = ComposedComponent.childContextTypes || {};
  MuiThemeDecorator.childContextTypes.muiTheme = _react2['default'].PropTypes.object;

  return MuiThemeDecorator;
}

exports['default'] = muiTheme;
module.exports = exports['default'];