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

var _componentsPaper = require('../../components/Paper');

var _componentsPaper2 = _interopRequireDefault(_componentsPaper);

var _componentsButton = require('../../components/Button');

var _componentsButton2 = _interopRequireDefault(_componentsButton);

var _componentsLogo = require('../../components/Logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var _decoratorsDocumentTitle = require('../../decorators/documentTitle');

var _decoratorsDocumentTitle2 = _interopRequireDefault(_decoratorsDocumentTitle);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var LoginPage = (function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage() {
    _classCallCheck(this, _LoginPage);

    _get(Object.getPrototypeOf(_LoginPage.prototype), 'constructor', this).apply(this, arguments);
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
          _react2['default'].createElement(_componentsLogo2['default'], { className: _stylesScss2['default'].logo, styled: true }),
          _react2['default'].createElement(
            _componentsPaper2['default'],
            { className: _stylesScss2['default'].paper },
            _react2['default'].createElement(
              'h3',
              { className: _stylesScss2['default'].title },
              'SIGN IN'
            ),
            _react2['default'].createElement(
              'form',
              { className: _stylesScss2['default'].form },
              _react2['default'].createElement(_materialUi.TextField, { fullWidth: true, zDepth: 0, floatingLabelText: "Username" }),
              _react2['default'].createElement(
                _materialUi.TextField,
                { fullWidth: true, zDepth: 0, floatingLabelText: "Password" },
                _react2['default'].createElement('input', { type: "password" })
              ),
              _react2['default'].createElement(
                'p',
                { className: _stylesScss2['default'].consent },
                'By signing up you agree to our',
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(
                  'u',
                  null,
                  'Terms of Service'
                ),
                ' and ',
                _react2['default'].createElement(
                  'u',
                  null,
                  'Privacy Policy'
                ),
                '.'
              ),
              _react2['default'].createElement(
                'div',
                { className: _stylesScss2['default'].buttons },
                _react2['default'].createElement(
                  _componentsButton2['default'],
                  { className: _stylesScss2['default'].button, type: 'submit' },
                  'SIGN IN'
                ),
                _react2['default'].createElement(
                  _componentsButton2['default'],
                  { className: _stylesScss2['default'].button, link: true, href: '/register', outline: true },
                  'SIGN UP'
                )
              )
            )
          )
        )
      );
    }
  }]);

  var _LoginPage = LoginPage;
  LoginPage = (0, _decoratorsDocumentTitle2['default'])('Sign In')(LoginPage) || LoginPage;
  return LoginPage;
})(_react2['default'].Component);

exports['default'] = LoginPage;
module.exports = exports['default'];