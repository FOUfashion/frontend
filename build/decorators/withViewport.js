'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _node_modulesReactLibExecutionEnvironment = require('../../node_modules/react/lib/ExecutionEnvironment');

var EE = undefined;
var viewport = { width: 1366, height: 768 };
var RESIZE_EVENT = 'resize';

function handleWindowResize() {
  if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
    viewport = { width: window.innerWidth, height: window.innerHeight };
    EE.emit(RESIZE_EVENT, viewport);
  }
}

function withViewport(ComposedComponent) {
  return (function (_Component) {
    _inherits(WithViewport, _Component);

    function WithViewport() {
      _classCallCheck(this, WithViewport);

      _get(Object.getPrototypeOf(WithViewport.prototype), 'constructor', this).call(this);

      this.state = {
        viewport: _node_modulesReactLibExecutionEnvironment.canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport
      };
    }

    _createClass(WithViewport, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!EE) {
          EE = new _eventemitter32['default']();
          window.addEventListener('resize', handleWindowResize);
          window.addEventListener('orientationchange', handleWindowResize);
        }

        EE.on('resize', this.handleResize, this);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        EE.removeListener(RESIZE_EVENT, this.handleResize, this);

        if (!EE.listeners(RESIZE_EVENT, true)) {
          window.removeEventListener('resize', handleWindowResize);
          window.removeEventListener('orientationchange', handleWindowResize);
          EE = null;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, { viewport: this.state.viewport }));
      }
    }, {
      key: 'handleResize',
      value: function handleResize(value) {
        this.setState({ viewport: value });
      }
    }]);

    return WithViewport;
  })(_react.Component);
}

exports['default'] = withViewport;
module.exports = exports['default'];