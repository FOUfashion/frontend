'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _node_modulesReactLibEmptyFunction = require('../../node_modules/react/lib/emptyFunction');

var _node_modulesReactLibEmptyFunction2 = _interopRequireDefault(_node_modulesReactLibEmptyFunction);

function withContext(ComposedComponent) {
  return (function () {
    function WithContext() {
      _classCallCheck(this, WithContext);
    }

    _createClass(WithContext, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          onInsertCss: context.onInsertCss || _node_modulesReactLibEmptyFunction2['default'],
          onSetTitle: context.onSetTitle || _node_modulesReactLibEmptyFunction2['default'],
          onSetMeta: context.onSetMeta || _node_modulesReactLibEmptyFunction2['default'],
          onPageNotFound: context.onPageNotFound || _node_modulesReactLibEmptyFunction2['default']
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var context = _props.context;

        var other = _objectWithoutProperties(_props, ['context']);

        return _react2['default'].createElement(ComposedComponent, other);
      }
    }], [{
      key: 'propTypes',
      value: {
        context: _react.PropTypes.shape({
          onInsertCss: _react.PropTypes.func,
          onSetTitle: _react.PropTypes.func,
          onSetMeta: _react.PropTypes.func,
          onPageNotFound: _react.PropTypes.func
        })
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        onInsertCss: _react.PropTypes.func.isRequired,
        onSetTitle: _react.PropTypes.func.isRequired,
        onSetMeta: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    return WithContext;
  })();
}

exports['default'] = withContext;
module.exports = exports['default'];