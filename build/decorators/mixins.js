'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactMixin = require('react-mixin');

/**
 * Bind the methods to the component's scope.
 */

var _reactMixin2 = _interopRequireDefault(_reactMixin);

function autobind(methodNames) {
  return {
    componentWillMount: function componentWillMount() {
      var _this = this;

      methodNames.forEach(function (name) {
        if (typeof _this[name] === 'function') {
          _this[name] = _this[name].bind(_this);
        }
      });
    }
  };
}

/**
 * Adds support for mixins by manually copying its methods into the component.
 */
function mixinsDecorator() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  return function (ComposedComponent) {
    mixins.forEach(function (mixin) {
      _reactMixin2['default'].onClass(ComposedComponent, mixin);
      _reactMixin2['default'].onClass(ComposedComponent, autobind(_Object$keys(mixin)));
    });

    return ComposedComponent;
  };
}

exports['default'] = mixinsDecorator;
module.exports = exports['default'];