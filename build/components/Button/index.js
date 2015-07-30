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

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var _classnames = require('classnames');

/**
 * A button component with different options:
 *
 * @type  link      Render the component as an <a> instead of <button>.
 * @type  light     White instead of black.
 * @type  outline   Don't fill the button.
 * @type  external  Internal buttons use react-router's Link instead of <a> or <button>.
 * @type  loading   Whether a loading indicator should be shown instead of text.
 * @type  children  Text to display inside the button.
 * @type  className Add classes to the element.
 * @type  type      Button type.
 * @type  href      A link to redirect to.
 */

var _classnames2 = _interopRequireDefault(_classnames);

var Button = (function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _this = this;

    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);

    this.handleClick = function () {
      if (!_this.props.loading && _this.props.href) {
        document.location = _this.props.href;
      }
    };
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var link = _props.link;
      var light = _props.light;
      var outline = _props.outline;
      var external = _props.external;
      var loading = _props.loading;
      var children = _props.children;
      var className = _props.className;
      var onClick = _props.onClick;
      var href = _props.href;

      var props = _objectWithoutProperties(_props, ['link', 'light', 'outline', 'external', 'loading', 'children', 'className', 'onClick', 'href']);

      var fillClass = outline ? _stylesScss2['default'].outline : _stylesScss2['default'].filled;
      var colorClass = light ? _stylesScss2['default'].light : _stylesScss2['default'].dark;
      var classes = (0, _classnames2['default'])(fillClass, colorClass, className);

      if (loading) {
        children = _react2['default'].createElement(
          'div',
          { className: _stylesScss2['default'].loader },
          _react2['default'].createElement('div', null),
          _react2['default'].createElement('div', null)
        );
      }

      if (!link) {
        return _react2['default'].createElement(
          'button',
          _extends({
            className: classes,
            onClick: onClick || this.handleClick,
            disabled: loading
          }, props),
          children
        );
      } else if (external) {
        return _react2['default'].createElement(
          'a',
          _extends({
            className: classes,
            onClick: onClick,
            href: href
          }, props),
          children
        );
      } else {
        return _react2['default'].createElement(
          _reactRouter.Link,
          _extends({
            className: classes,
            onClick: onClick,
            to: href
          }, props),
          children
        );
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      link: _react.PropTypes.bool,
      light: _react.PropTypes.bool,
      outline: _react.PropTypes.bool,
      external: _react.PropTypes.bool,
      loading: _react.PropTypes.bool,
      children: _react.PropTypes.node,
      className: _react.PropTypes.string,
      onClick: _react.PropTypes.func,
      href: _react.PropTypes.string,
      type: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Button;
})(_react2['default'].Component);

exports['default'] = Button;
module.exports = exports['default'];