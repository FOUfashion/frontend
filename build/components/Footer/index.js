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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var Footer = (function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    _get(Object.getPrototypeOf(Footer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'footer',
        { className: (0, _classnames2['default'])(_stylesScss2['default'].footer, this.props.className) },
        _react2['default'].createElement(
          'p',
          { className: _stylesScss2['default'].credits },
          'Designed and programmed with <3 by ',
          _react2['default'].createElement(
            'a',
            { href: 'http://www.aluxian.com', target: '_blank' },
            'Alexandru Rosianu'
          ),
          '.'
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Footer;
})(_react2['default'].Component);

exports['default'] = Footer;
module.exports = exports['default'];