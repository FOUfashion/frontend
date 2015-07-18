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

var _NotFoundPageLess = require('./NotFoundPage.less');

var _NotFoundPageLess2 = _interopRequireDefault(_NotFoundPageLess);

var NotFoundPage = (function () {
  function NotFoundPage() {
    _classCallCheck(this, _NotFoundPage);
  }

  _createClass(NotFoundPage, [{
    key: 'render',
    value: function render() {
      var title = 'Page Not Found';
      this.context.onSetTitle(title);
      this.context.onPageNotFound();
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          title
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Sorry, but the page you were trying to view does not exist.'
        )
      );
    }
  }], [{
    key: 'contextTypes',
    value: {
      onSetTitle: _react.PropTypes.func.isRequired,
      onPageNotFound: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _NotFoundPage = NotFoundPage;
  NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageLess2['default'])(NotFoundPage) || NotFoundPage;
  return NotFoundPage;
})();

exports['default'] = NotFoundPage;
module.exports = exports['default'];