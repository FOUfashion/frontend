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

var Media = (function (_React$Component) {
  _inherits(Media, _React$Component);

  function Media() {
    _classCallCheck(this, Media);

    _get(Object.getPrototypeOf(Media.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Media, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('img', { className: _stylesScss2['default'].image, src: this.props.imageUrl });
    }
  }], [{
    key: 'propTypes',
    value: {
      imageUrl: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return Media;
})(_react2['default'].Component);

exports['default'] = Media;
module.exports = exports['default'];