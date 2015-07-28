'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

/**
 * The beautiful Fou logo created with the Azedo typeface.
 *
 * @styled    Whether the logo should be styled by default.
 * @outline   Add a border around the text.
 * @children  Replace the default text.
 * @className Add classes to the element.
 */

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var Logo = (function (_React$Component) {
  _inherits(Logo, _React$Component);

  function Logo() {
    _classCallCheck(this, Logo);

    _get(Object.getPrototypeOf(Logo.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Logo, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var className = (0, _classnames2['default'])(_stylesScss2['default'].type, this.props.className, (_classNames = {}, _defineProperty(_classNames, _stylesScss2['default'].outline, this.props.outline), _defineProperty(_classNames, _stylesScss2['default'].styled, this.props.styled), _classNames));

      if (this.props.children) {
        return _react2['default'].createElement(
          'span',
          { className: className },
          this.props.children
        );
      } else {
        return _react2['default'].createElement(
          'span',
          { className: className },
          _react2['default'].createElement(
            'span',
            { className: _stylesScss2['default'].f },
            'F'
          ),
          _react2['default'].createElement(
            'span',
            { className: _stylesScss2['default'].o },
            'O'
          ),
          _react2['default'].createElement(
            'span',
            { className: _stylesScss2['default'].u },
            'U'
          )
        );
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      styled: _react.PropTypes.bool,
      outline: _react.PropTypes.bool,
      children: _react.PropTypes.string,
      className: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      styled: false,
      outline: false,
      children: '',
      className: ''
    },
    enumerable: true
  }]);

  return Logo;
})(_react2['default'].Component);

exports['default'] = Logo;
module.exports = exports['default'];