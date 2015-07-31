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

var _componentsFooter = require('../../components/Footer');

var _componentsFooter2 = _interopRequireDefault(_componentsFooter);

var _componentsButton = require('../../components/Button');

var _componentsButton2 = _interopRequireDefault(_componentsButton);

var _componentsLogo = require('../../components/Logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var _decoratorsDocumentTitle = require('../../decorators/documentTitle');

var _decoratorsDocumentTitle2 = _interopRequireDefault(_decoratorsDocumentTitle);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var LandingPage = (function (_React$Component) {
  _inherits(LandingPage, _React$Component);

  function LandingPage() {
    _classCallCheck(this, _LandingPage);

    _get(Object.getPrototypeOf(_LandingPage.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LandingPage, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: _stylesScss2['default'].page },
        _react2['default'].createElement(
          'section',
          { className: _stylesScss2['default'].row },
          _react2['default'].createElement(_componentsLogo2['default'], { className: _stylesScss2['default'].logo, outline: true }),
          _react2['default'].createElement(
            'div',
            { className: _stylesScss2['default'].buttons },
            _react2['default'].createElement(
              _componentsButton2['default'],
              {
                className: _stylesScss2['default'].button, light: true, outline: true, link: true, external: true,
                href: "http://eepurl.com/buQtCT" },
              'NEWSLETTER SIGN UP'
            ),
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].notice },
              'We\'ll let you know when registrations are open.'
            )
          ),
          _react2['default'].createElement(
            'p',
            { className: _stylesScss2['default'].tagline },
            _react2['default'].createElement(
              'span',
              { className: _stylesScss2['default'].segment },
              'fashion.'
            ),
            _react2['default'].createElement(
              'span',
              { className: _stylesScss2['default'].segment },
              'inspiration.'
            )
          )
        ),
        _react2['default'].createElement(
          'section',
          { className: _stylesScss2['default'].row },
          _react2['default'].createElement(
            'div',
            { className: _stylesScss2['default'].copy },
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].line },
              'Discover new patterns,'
            ),
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].line },
              'colours and ideas.'
            )
          )
        ),
        _react2['default'].createElement(
          'section',
          { className: _stylesScss2['default'].row },
          _react2['default'].createElement(
            'div',
            { className: _stylesScss2['default'].copy },
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].line },
              _react2['default'].createElement(
                'span',
                null,
                'Get inspired by places,'
              )
            ),
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].line },
              _react2['default'].createElement(
                'span',
                null,
                'cultures,'
              )
            ),
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].line },
              _react2['default'].createElement(
                'span',
                null,
                'people.'
              )
            )
          )
        ),
        _react2['default'].createElement(
          'section',
          { className: _stylesScss2['default'].row },
          _react2['default'].createElement(
            'div',
            { className: _stylesScss2['default'].copy },
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].line },
              'Meet designers, creators, models, artists.'
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: _stylesScss2['default'].buttons },
            _react2['default'].createElement(
              _componentsButton2['default'],
              {
                className: _stylesScss2['default'].button, light: true, outline: true, link: true, external: true,
                href: "http://eepurl.com/buQtCT" },
              'NEWSLETTER SIGN UP'
            ),
            _react2['default'].createElement(
              'p',
              { className: _stylesScss2['default'].notice },
              'We\'ll let you know when registrations are open.'
            )
          )
        ),
        _react2['default'].createElement(_componentsFooter2['default'], null)
      );
    }
  }]);

  var _LandingPage = LandingPage;
  LandingPage = (0, _decoratorsDocumentTitle2['default'])('Fou')(LandingPage) || LandingPage;
  return LandingPage;
})(_react2['default'].Component);

exports['default'] = LandingPage;
module.exports = exports['default'];