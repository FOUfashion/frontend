'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

//import styles from './styles.scss';

var _react2 = _interopRequireDefault(_react);

var Footer = (function () {
  function Footer() {
    _classCallCheck(this, Footer);
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'span',
          null,
          '© Your Company'
        )
      );
    }
  }]);

  return Footer;
})();

exports['default'] = Footer;
module.exports = exports['default'];