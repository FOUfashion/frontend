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

var _materialUi = require('material-ui');

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var Header = (function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: _stylesScss2['default'].header },
        _react2['default'].createElement(
          _materialUi.Avatar,
          { className: _stylesScss2['default'].avatar },
          this.props.author.name.full[0]
        ),
        _react2['default'].createElement(
          'h3',
          { className: _stylesScss2['default'].title },
          this.props.author.name.full,
          _react2['default'].createElement('br', null),
          _react2['default'].createElement(
            'span',
            { className: _stylesScss2['default'].subtitle },
            this.props.author.title
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      author: _react.PropTypes.shape({
        name: _react.PropTypes.shape({
          full: _react.PropTypes.string
        }),
        title: _react.PropTypes.string.isRequired
      }).isRequired
    },
    enumerable: true
  }]);

  return Header;
})(_react2['default'].Component);

exports['default'] = Header;
module.exports = exports['default'];