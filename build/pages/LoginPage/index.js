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

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var LoginPage = (function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage() {
    _classCallCheck(this, LoginPage);

    _get(Object.getPrototypeOf(LoginPage.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LoginPage, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: _stylesScss2['default'].page },
        _react2['default'].createElement(
          'div',
          { className: _stylesScss2['default'].container },
          _react2['default'].createElement(
            'p',
            null,
            '...'
          )
        )
      );
    }
  }]);

  return LoginPage;
})(_react2['default'].Component);

exports['default'] = LoginPage;
module.exports = exports['default'];