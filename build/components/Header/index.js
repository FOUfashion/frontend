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

var Header = (function () {
  function Header() {
    _classCallCheck(this, Header);
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'React'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Complex web apps made easy'
        )
      );
    }
  }]);

  return Header;
})();

exports['default'] = Header;
module.exports = exports['default'];