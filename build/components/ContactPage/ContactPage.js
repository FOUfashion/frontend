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

var _ContactPageLess = require('./ContactPage.less');

var _ContactPageLess2 = _interopRequireDefault(_ContactPageLess);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var ContactPage = (function () {
  function ContactPage() {
    _classCallCheck(this, _ContactPage);
  }

  _createClass(ContactPage, [{
    key: 'render',
    value: function render() {
      var title = 'Contact Us';
      this.context.onSetTitle(title);
      return _react2['default'].createElement(
        'div',
        { className: 'ContactPage' },
        _react2['default'].createElement(
          'div',
          { className: 'ContactPage-container' },
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

  var _ContactPage = ContactPage;
  ContactPage = (0, _decoratorsWithStyles2['default'])(_ContactPageLess2['default'])(ContactPage) || ContactPage;
  return ContactPage;
})();

exports['default'] = ContactPage;
module.exports = exports['default'];