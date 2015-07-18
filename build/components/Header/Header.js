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

var _HeaderLess = require('./Header.less');

var _HeaderLess2 = _interopRequireDefault(_HeaderLess);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var _utilsLink = require('../../utils/Link');

var _utilsLink2 = _interopRequireDefault(_utilsLink);

var _Navigation = require('../Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var Header = (function () {
  function Header() {
    _classCallCheck(this, _Header);
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'Header' },
        _react2['default'].createElement(
          'div',
          { className: 'Header-container' },
          _react2['default'].createElement(
            'a',
            { className: 'Header-brand', href: '/', onClick: _utilsLink2['default'].handleClick },
            _react2['default'].createElement('img', { className: 'Header-brandImg', src: require('./logo-small.png'), width: '38', height: '38', alt: 'React' }),
            _react2['default'].createElement(
              'span',
              { className: 'Header-brandTxt' },
              'Your Company'
            )
          ),
          _react2['default'].createElement(_Navigation2['default'], { className: 'Header-nav' }),
          _react2['default'].createElement(
            'div',
            { className: 'Header-banner' },
            _react2['default'].createElement(
              'h1',
              { className: 'Header-bannerTitle' },
              'React'
            ),
            _react2['default'].createElement(
              'p',
              { className: 'Header-bannerDesc' },
              'Complex web apps made easy'
            )
          )
        )
      );
    }
  }]);

  var _Header = Header;
  Header = (0, _decoratorsWithStyles2['default'])(_HeaderLess2['default'])(Header) || Header;
  return Header;
})();

exports['default'] = Header;
module.exports = exports['default'];