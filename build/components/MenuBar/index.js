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

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _PaperHeader = require('../Paper/Header');

var _PaperHeader2 = _interopRequireDefault(_PaperHeader);

var _PaperMenuList = require('../Paper/MenuList');

var _PaperMenuList2 = _interopRequireDefault(_PaperMenuList);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var MenuBar = (function (_React$Component) {
  _inherits(MenuBar, _React$Component);

  function MenuBar() {
    _classCallCheck(this, MenuBar);

    _get(Object.getPrototypeOf(MenuBar.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MenuBar, [{
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2['default'])(_stylesScss2['default'].chatBar, this.props.className);
      var entries = [{
        name: 'Feed',
        href: '/feed'
      }, {
        name: 'Messages',
        href: '/messages'
      }, {
        name: 'Profile',
        href: '/me'
      }];

      return _react2['default'].createElement(
        _Paper2['default'],
        { className: classes },
        _react2['default'].createElement(
          _PaperHeader2['default'],
          null,
          'MENU'
        ),
        _react2['default'].createElement(_PaperMenuList2['default'], { entries: entries })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return MenuBar;
})(_react2['default'].Component);

exports['default'] = MenuBar;
module.exports = exports['default'];