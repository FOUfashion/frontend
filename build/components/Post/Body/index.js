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

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var Body = (function (_React$Component) {
  _inherits(Body, _React$Component);

  function Body() {
    _classCallCheck(this, Body);

    _get(Object.getPrototypeOf(Body.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Body, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'p',
        { className: _stylesScss2['default'].body },
        this.props.body
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      body: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return Body;
})(_react2['default'].Component);

exports['default'] = Body;
module.exports = exports['default'];