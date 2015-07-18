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

var _ContentPageLess = require('./ContentPage.less');

var _ContentPageLess2 = _interopRequireDefault(_ContentPageLess);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var ContentPage = (function () {
  function ContentPage() {
    _classCallCheck(this, _ContentPage);
  }

  _createClass(ContentPage, [{
    key: 'render',
    value: function render() {
      this.context.onSetTitle(this.props.title);
      return _react2['default'].createElement(
        'div',
        { className: 'ContentPage' },
        _react2['default'].createElement(
          'div',
          { className: 'ContentPage-container' },
          this.props.path === '/' ? null : _react2['default'].createElement(
            'h1',
            null,
            this.props.title
          ),
          _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      path: _react.PropTypes.string.isRequired,
      content: _react.PropTypes.string.isRequired,
      title: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      onSetTitle: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _ContentPage = ContentPage;
  ContentPage = (0, _decoratorsWithStyles2['default'])(_ContentPageLess2['default'])(ContentPage) || ContentPage;
  return ContentPage;
})();

exports['default'] = ContentPage;
module.exports = exports['default'];