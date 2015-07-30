'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDocumentTitle = require('react-document-title');

/**
 * Wrap the component with a HoC to specify the document title.
 */

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

function documentTitle(title) {
  return function (ComposedComponent) {
    return (function () {
      function DocumentTitleDecorator() {
        _classCallCheck(this, DocumentTitleDecorator);
      }

      _createClass(DocumentTitleDecorator, [{
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(
            _reactDocumentTitle2['default'],
            { title: title },
            _react2['default'].createElement(ComposedComponent, this.props)
          );
        }
      }]);

      return DocumentTitleDecorator;
    })();
  };
}

exports['default'] = documentTitle;
module.exports = exports['default'];