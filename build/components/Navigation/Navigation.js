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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _NavigationLess = require('./Navigation.less');

var _NavigationLess2 = _interopRequireDefault(_NavigationLess);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var _utilsLink = require('../../utils/Link');

var _utilsLink2 = _interopRequireDefault(_utilsLink);

var Navigation = (function () {
  function Navigation() {
    _classCallCheck(this, _Navigation);
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])(this.props.className, 'Navigation'), role: 'navigation' },
        _react2['default'].createElement(
          'a',
          { className: 'Navigation-link', href: '/about', onClick: _utilsLink2['default'].handleClick },
          'About'
        ),
        _react2['default'].createElement(
          'a',
          { className: 'Navigation-link', href: '/contact', onClick: _utilsLink2['default'].handleClick },
          'Contact'
        ),
        _react2['default'].createElement(
          'span',
          { className: 'Navigation-spacer' },
          ' | '
        ),
        _react2['default'].createElement(
          'a',
          { className: 'Navigation-link', href: '/login', onClick: _utilsLink2['default'].handleClick },
          'Log in'
        ),
        _react2['default'].createElement(
          'span',
          { className: 'Navigation-spacer' },
          'or'
        ),
        _react2['default'].createElement(
          'a',
          { className: 'Navigation-link Navigation-link--highlight', href: '/register', onClick: _utilsLink2['default'].handleClick },
          'Sign up'
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

  var _Navigation = Navigation;
  Navigation = (0, _decoratorsWithStyles2['default'])(_NavigationLess2['default'])(Navigation) || Navigation;
  return Navigation;
})();

exports['default'] = Navigation;
module.exports = exports['default'];