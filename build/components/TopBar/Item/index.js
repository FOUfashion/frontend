'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var Item = (function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item() {
    _classCallCheck(this, Item);

    _get(Object.getPrototypeOf(Item.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Item, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var external = _props.external;
      var href = _props.href;
      var float = _props.float;

      var props = _objectWithoutProperties(_props, ['children', 'className', 'external', 'href', 'float']);

      var classes = (0, _classnames2['default'])(_stylesScss2['default'].link, _stylesScss2['default'][float], className);

      if (external) {
        return _react2['default'].createElement(
          'a',
          _extends({ href: href, className: classes }, props),
          children
        );
      } else {
        return _react2['default'].createElement(
          _reactRouter.Link,
          _extends({ to: href, className: classes }, props),
          children
        );
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      children: _react.PropTypes.node,
      className: _react.PropTypes.string,
      external: _react.PropTypes.bool,
      href: _react.PropTypes.string,
      float: _react.PropTypes.oneOf(['left', 'right'])
    },
    enumerable: true
  }]);

  return Item;
})(_react2['default'].Component);

exports['default'] = Item;
module.exports = exports['default'];