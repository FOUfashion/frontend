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
          'div',
          { className: _stylesScss2['default'].container },
          _react2['default'].createElement(_componentsLogo2['default'], { className: _stylesScss2['default'].logo })
        )
      );
    }
  }]);

  var _LandingPage = LandingPage;
  LandingPage = (0, _decoratorsDocumentTitle2['default'])('Fou')(LandingPage) || LandingPage;
  return LandingPage;
})(_react2['default'].Component);

exports['default'] = LandingPage;
module.exports = exports['default'];