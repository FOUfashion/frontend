'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Logo = (function (_React$Component) {
  _inherits(Logo, _React$Component);

  function Logo() {
    _classCallCheck(this, Logo);

    _get(Object.getPrototypeOf(Logo.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Logo, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('img', _extends({ src: require('../../images/logo.svg') }, this.props));
    }
  }]);

  return Logo;
})(_react2['default'].Component);

exports['default'] = Logo;
module.exports = exports['default'];