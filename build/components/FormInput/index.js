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

var _materialUi = require('material-ui');

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

require('./validations');

var _decoratorsMixin = require('../../decorators/mixin');

var _decoratorsMixin2 = _interopRequireDefault(_decoratorsMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var FormInput = (function (_React$Component) {
  _inherits(FormInput, _React$Component);

  function FormInput() {
    _classCallCheck(this, _FormInput);

    _get(Object.getPrototypeOf(_FormInput.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FormInput, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var children = this.props.password ? _react2['default'].createElement('input', { type: "password" }) : undefined;
      var _props = this.props;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['className']);

      var classes = (0, _classnames2['default'])(_stylesScss2['default'].field, className);

      if (this.props.shake && this.showRequired()) {
        classes = (0, _classnames2['default'])(classes, _stylesScss2['default'].shake);
      }

      return _react2['default'].createElement(
        _materialUi.TextField,
        _extends({
          className: classes,
          style: { width: undefined },
          errorText: this.getErrorMessage(),
          onChange: function (event) {
            return _this.setValue(event.currentTarget.value);
          },
          value: this.getValue()
        }, props),
        children
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      shake: _react.PropTypes.bool,
      password: _react.PropTypes.bool,
      className: _react.PropTypes.string
    },
    enumerable: true
  }]);

  var _FormInput = FormInput;
  FormInput = (0, _decoratorsMixin2['default'])(_formsyReact2['default'].Mixin)(FormInput) || FormInput;
  return FormInput;
})(_react2['default'].Component);

exports['default'] = FormInput;
module.exports = exports['default'];