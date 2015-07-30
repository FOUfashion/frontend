'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Post = require('../Post');

var _Post2 = _interopRequireDefault(_Post);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var Feed = (function (_React$Component) {
  _inherits(Feed, _React$Component);

  function Feed() {
    _classCallCheck(this, Feed);

    _get(Object.getPrototypeOf(Feed.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Feed, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['className']);

      var classes = (0, _classnames2['default'])(_stylesScss2['default'].feed, className);

      var posts = [{
        id: '123',
        author: {
          name: {
            full: 'John Doe'
          },
          gravatarHash: 'HASH'
        },
        createdAt: new Date(),
        body: 'Test :)',
        imageUrl: 'http://www.gravatar.com/avatar/HASH5?s=1024&d=retro',
        likes: [{
          name: {
            full: 'Mike Nicholson'
          }
        }]
      }, {
        id: '456',
        author: {
          name: {
            full: 'Diana Crane'
          },
          gravatarHash: 'HASH2'
        },
        createdAt: new Date(),
        body: 'This is awesome, guys.',
        imageUrl: 'http://www.gravatar.com/avatar/HASH3?s=1024&d=retro',
        likes: [{
          name: {
            full: 'Superman Sporty'
          }
        }]
      }];

      return _react2['default'].createElement(
        'ul',
        { className: classes },
        posts.map(function (post) {
          return _react2['default'].createElement(_Post2['default'], { post: post, key: post.id });
        })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Feed;
})(_react2['default'].Component);

exports['default'] = Feed;
module.exports = exports['default'];