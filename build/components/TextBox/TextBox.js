/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var _TextBoxLess = require('./TextBox.less');

var _TextBoxLess2 = _interopRequireDefault(_TextBoxLess);

var TextBox = (function () {
  function TextBox() {
    _classCallCheck(this, _TextBox);
  }

  _createClass(TextBox, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'TextBox' },
        this.props.maxLines > 1 ? _react2['default'].createElement('textarea', _extends({}, this.props, { className: 'TextBox-input', ref: 'input', key: 'input', rows: this.props.maxLines })) : _react2['default'].createElement('input', _extends({}, this.props, { className: 'TextBox-input', ref: 'input', key: 'input' }))
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      maxLines: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      maxLines: 1
    },
    enumerable: true
  }]);

  var _TextBox = TextBox;
  TextBox = (0, _decoratorsWithStyles2['default'])(_TextBoxLess2['default'])(TextBox) || TextBox;
  return TextBox;
})();

exports['default'] = TextBox;
module.exports = exports['default'];