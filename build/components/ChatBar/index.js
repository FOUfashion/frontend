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

var _PaperPeopleList = require('../Paper/PeopleList');

var _PaperPeopleList2 = _interopRequireDefault(_PaperPeopleList);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var ChatBar = (function (_React$Component) {
  _inherits(ChatBar, _React$Component);

  function ChatBar() {
    _classCallCheck(this, ChatBar);

    _get(Object.getPrototypeOf(ChatBar.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ChatBar, [{
    key: 'render',
    value: function render() {
      var className = (0, _classnames2['default'])(_stylesScss2['default'].chatBar, this.props.className);
      var people = [{
        name: 'Sun Moore',
        href: '/people/username'
      }, {
        name: 'Jade Johnson',
        href: '/people/username'
      }, {
        name: 'Monica Düsseldorf',
        href: '/people/username'
      }, {
        name: 'George Anthony',
        href: '/people/username'
      }];

      return _react2['default'].createElement(
        _Paper2['default'],
        { className: className },
        _react2['default'].createElement(
          _PaperHeader2['default'],
          null,
          'CHAT'
        ),
        _react2['default'].createElement(_PaperPeopleList2['default'], { entries: people })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return ChatBar;
})(_react2['default'].Component);

exports['default'] = ChatBar;
module.exports = exports['default'];