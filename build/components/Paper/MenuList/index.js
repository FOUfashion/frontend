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

var List = (function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(List, [{
    key: 'insertDividers',
    value: function insertDividers(items) {
      var entries = [];

      items.forEach(function (item, index) {
        entries.push(_react2['default'].createElement(
          'li',
          { key: entries.length },
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: item.href, className: _stylesScss2['default'].entry },
            item.name
          )
        ));

        if (index < items.length - 1) {
          entries.push(_react2['default'].createElement('li', { key: entries.length, className: _stylesScss2['default'].divider }));
        }
      });

      return entries;
    }
  }, {
    key: 'render',
    value: function render() {
      var entries = this.insertDividers(this.props.entries);

      return _react2['default'].createElement(
        'ul',
        { className: _stylesScss2['default'].entries },
        entries
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      entries: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        name: _react.PropTypes.string,
        href: _react.PropTypes.string
      })).isRequired
    },
    enumerable: true
  }]);

  return List;
})(_react2['default'].Component);

exports['default'] = List;
module.exports = exports['default'];