/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FeedbackLess = require('./Feedback.less');

var _FeedbackLess2 = _interopRequireDefault(_FeedbackLess);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var Feedback = (function () {
  function Feedback() {
    _classCallCheck(this, _Feedback);
  }

  _createClass(Feedback, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'Feedback' },
        _react2['default'].createElement(
          'div',
          { className: 'Feedback-container' },
          _react2['default'].createElement(
            'a',
            { className: 'Feedback-link', href: 'https://gitter.im/kriasoft/react-starter-kit' },
            'Ask a question'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'Feedback-spacer' },
            '|'
          ),
          _react2['default'].createElement(
            'a',
            { className: 'Feedback-link', href: 'https://github.com/kriasoft/react-starter-kit/issues/new' },
            'Report an issue'
          )
        )
      );
    }
  }]);

  var _Feedback = Feedback;
  Feedback = (0, _decoratorsWithStyles2['default'])(_FeedbackLess2['default'])(Feedback) || Feedback;
  return Feedback;
})();

exports['default'] = Feedback;
module.exports = exports['default'];