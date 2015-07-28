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

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Media = require('./Media');

var _Media2 = _interopRequireDefault(_Media);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var Post = (function (_React$Component) {
  _inherits(Post, _React$Component);

  function Post() {
    _classCallCheck(this, Post);

    _get(Object.getPrototypeOf(Post.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Post, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _Paper2['default'],
        null,
        _react2['default'].createElement(_Header2['default'], this.props.post),
        _react2['default'].createElement(_Body2['default'], this.props.post),
        _react2['default'].createElement(_Media2['default'], this.props.post),
        _react2['default'].createElement(_Footer2['default'], this.props.post)
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      post: _react.PropTypes.shape({
        author: _react.PropTypes.shape({
          name: _react.PropTypes.shape({
            full: _react.PropTypes.string
          }),
          gravatarHash: _react.PropTypes.string
        }),
        createdAt: _react.PropTypes.date,
        body: _react.PropTypes.string,
        imageUrl: _react.PropTypes.string,
        likes: _react.PropTypes.arrayOf(_react.PropTypes.shape({
          name: _react.PropTypes.shape({
            full: _react.PropTypes.string
          })
        }))
      }).isRequired
    },
    enumerable: true
  }]);

  return Post;
})(_react2['default'].Component);

exports['default'] = Post;
module.exports = exports['default'];