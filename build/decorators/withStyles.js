'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _node_modulesReactLibInvariant = require('../../node_modules/react/lib/invariant');

var _node_modulesReactLibInvariant2 = _interopRequireDefault(_node_modulesReactLibInvariant);

var _node_modulesReactLibExecutionEnvironment = require('../../node_modules/react/lib/ExecutionEnvironment');

var count = 0;

function withStyles(styles) {
  return function (ComposedComponent) {
    return (function () {
      _createClass(WithStyles, null, [{
        key: 'contextTypes',
        value: {
          onInsertCss: _react.PropTypes.func
        },
        enumerable: true
      }]);

      function WithStyles() {
        _classCallCheck(this, WithStyles);

        this.refCount = 0;

        ComposedComponent.prototype.renderCss = (function (css) {
          var style = undefined;

          if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
            if (this.styleId && (style = document.getElementById(this.styleId))) {
              if ('textContent' in style) {
                style.textContent = css;
              } else {
                style.styleSheet.cssText = css;
              }
            } else {
              this.styleId = 'dynamic-css-' + count++;
              style = document.createElement('style');
              style.setAttribute('id', this.styleId);
              style.setAttribute('type', 'text/css');

              if ('textContent' in style) {
                style.textContent = css;
              } else {
                style.styleSheet.cssText = css;
              }

              document.getElementsByTagName('head')[0].appendChild(style);
              this.refCount++;
            }
          } else {
            this.context.onInsertCss(css);
          }
        }).bind(this);
      }

      _createClass(WithStyles, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
            (0, _node_modulesReactLibInvariant2['default'])(styles.use, 'The style-loader must be configured with reference-counted API.');
            styles.use();
          } else {
            this.context.onInsertCss(styles.toString());
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          styles.unuse();

          if (this.styleId) {
            this.refCount--;

            if (this.refCount < 1) {
              var style = document.getElementById(this.styleId);

              if (style) {
                style.parentNode.removeChild(style);
              }
            }
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2['default'].createElement(ComposedComponent, this.props);
        }
      }]);

      return WithStyles;
    })();
  };
}

exports['default'] = withStyles;
module.exports = exports['default'];