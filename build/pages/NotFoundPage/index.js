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

var _reactRouter = require('react-router');

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var NotFoundPage = (function (_React$Component) {
  _inherits(NotFoundPage, _React$Component);

  function NotFoundPage() {
    _classCallCheck(this, NotFoundPage);

    _get(Object.getPrototypeOf(NotFoundPage.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(NotFoundPage, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: _stylesScss2['default'].page },
        _react2['default'].createElement(
          'div',
          { className: _stylesScss2['default'].container },
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: '/', className: _stylesScss2['default'].link },
            '404.',
            _react2['default'].createElement('br', null),
            'inspiration',
            _react2['default'].createElement('br', null),
            'not',
            _react2['default'].createElement('br', null),
            'found'
          )
        )
      );
    }
  }]);

  return NotFoundPage;
})(_react2['default'].Component);

exports['default'] = NotFoundPage;
module.exports = exports['default'];