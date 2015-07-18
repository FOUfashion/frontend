/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FooterLess = require('./Footer.less');

var _FooterLess2 = _interopRequireDefault(_FooterLess);

var _decoratorsWithViewport = require('../../decorators/withViewport');

var _decoratorsWithViewport2 = _interopRequireDefault(_decoratorsWithViewport);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var _utilsLink = require('../../utils/Link');

var _utilsLink2 = _interopRequireDefault(_utilsLink);

var Footer = (function () {
  function Footer() {
    _classCallCheck(this, _Footer);
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      // This is just an example how one can render CSS
      var _props$viewport = this.props.viewport;
      var width = _props$viewport.width;
      var height = _props$viewport.height;

      this.renderCss('.Footer-viewport:after {content:\' ' + width + 'x' + height + '\';}');

      return _react2['default'].createElement(
        'div',
        { className: 'Footer' },
        _react2['default'].createElement(
          'div',
          { className: 'Footer-container' },
          _react2['default'].createElement(
            'span',
            { className: 'Footer-text' },
            '© Your Company'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'Footer-spacer' },
            '·'
          ),
          _react2['default'].createElement(
            'a',
            { className: 'Footer-link', href: '/', onClick: _utilsLink2['default'].handleClick },
            'Home'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'Footer-spacer' },
            '·'
          ),
          _react2['default'].createElement(
            'a',
            { className: 'Footer-link', href: '/privacy', onClick: _utilsLink2['default'].handleClick },
            'Privacy'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'Footer-spacer' },
            '·'
          ),
          _react2['default'].createElement(
            'a',
            { className: 'Footer-link', href: '/not-found', onClick: _utilsLink2['default'].handleClick },
            'Not Found'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'Footer-spacer' },
            ' | '
          ),
          _react2['default'].createElement(
            'span',
            { ref: 'viewport', className: 'Footer-viewport Footer-text Footer-text--muted' },
            'Viewport:'
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      viewport: _react.PropTypes.shape({
        width: _react.PropTypes.number.isRequired,
        height: _react.PropTypes.number.isRequired
      }).isRequired
    },
    enumerable: true
  }]);

  var _Footer = Footer;
  Footer = (0, _decoratorsWithStyles2['default'])(_FooterLess2['default'])(Footer) || Footer;
  Footer = (0, _decoratorsWithViewport2['default'])(Footer) || Footer;
  return Footer;
})();

exports['default'] = Footer;
module.exports = exports['default'];