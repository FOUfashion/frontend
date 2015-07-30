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

var _stylingPalette = require('../styling/palette');

var _stylingPalette2 = _interopRequireDefault(_stylingPalette);

var _materialUi = require('material-ui');

/**
 * Wrap the component with a HoC that inserts the Material UI theme into the context.
 */

var _materialUi2 = _interopRequireDefault(_materialUi);

function muiTheme(ComposedComponent) {
  return (function (_React$Component) {
    _inherits(MuiThemeDecorator, _React$Component);

    function MuiThemeDecorator() {
      _classCallCheck(this, MuiThemeDecorator);

      _get(Object.getPrototypeOf(MuiThemeDecorator.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MuiThemeDecorator, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();
        ThemeManager.setPalette(_stylingPalette2['default']);

        var theme = ThemeManager.getCurrentTheme();
        theme.contentFontFamily = 'Helvetica, Arial, sans-serif';

        return {
          muiTheme: theme
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(ComposedComponent, this.props);
      }
    }], [{
      key: 'childContextTypes',
      value: {
        muiTheme: _react2['default'].PropTypes.object
      },
      enumerable: true
    }]);

    return MuiThemeDecorator;
  })(_react2['default'].Component);
}

exports['default'] = muiTheme;
module.exports = exports['default'];