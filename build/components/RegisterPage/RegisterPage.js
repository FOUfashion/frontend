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

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var _RegisterPageLess = require('./RegisterPage.less');

var _RegisterPageLess2 = _interopRequireDefault(_RegisterPageLess);

var RegisterPage = (function () {
  function RegisterPage() {
    _classCallCheck(this, _RegisterPage);
  }

  _createClass(RegisterPage, [{
    key: 'render',
    value: function render() {
      var title = 'New User Registration';
      this.context.onSetTitle(title);
      return _react2['default'].createElement(
        'div',
        { className: 'RegisterPage' },
        _react2['default'].createElement(
          'div',
          { className: 'RegisterPage-container' },
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            '...'
          )
        )
      );
    }
  }], [{
    key: 'contextTypes',
    value: {
      onSetTitle: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _RegisterPage = RegisterPage;
  RegisterPage = (0, _decoratorsWithStyles2['default'])(_RegisterPageLess2['default'])(RegisterPage) || RegisterPage;
  return RegisterPage;
})();

exports['default'] = RegisterPage;
module.exports = exports['default'];