'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppLess = require('./App.less');

var _AppLess2 = _interopRequireDefault(_AppLess);

var _decoratorsWithContext = require('../../decorators/withContext');

var _decoratorsWithContext2 = _interopRequireDefault(_decoratorsWithContext);

var _decoratorsWithStyles = require('../../decorators/withStyles');

var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

var _actionsAppActions = require('../../actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _storesAppStore = require('../../stores/AppStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _ContentPage = require('../ContentPage');

var _ContentPage2 = _interopRequireDefault(_ContentPage);

var _ContactPage = require('../ContactPage');

var _ContactPage2 = _interopRequireDefault(_ContactPage);

var _LoginPage = require('../LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _RegisterPage = require('../RegisterPage');

var _RegisterPage2 = _interopRequireDefault(_RegisterPage);

var _NotFoundPage = require('../NotFoundPage');

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _Feedback = require('../Feedback');

var _Feedback2 = _interopRequireDefault(_Feedback);

var _Footer = require('../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var pages = { ContentPage: _ContentPage2['default'], ContactPage: _ContactPage2['default'], LoginPage: _LoginPage2['default'], RegisterPage: _RegisterPage2['default'], NotFoundPage: _NotFoundPage2['default'] };

var App = (function () {
  function App() {
    _classCallCheck(this, _App);
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('popstate', this.handlePopState);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.path !== nextProps.path;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('popstate', this.handlePopState);
    }
  }, {
    key: 'handlePopState',
    value: function handlePopState(event) {
      _actionsAppActions2['default'].navigateTo(window.location.pathname, { replace: !!event.state });
    }
  }, {
    key: 'render',
    value: function render() {
      var component = undefined;

      switch (this.props.path) {
        case '/':
        case '/about':
        case '/privacy':
          var page = _storesAppStore2['default'].getPage(this.props.path);
          component = _react2['default'].createElement(pages[page.component], page);
          break;

        case '/contact':
          component = _react2['default'].createElement(_ContactPage2['default'], null);
          break;

        case '/login':
          component = _react2['default'].createElement(_LoginPage2['default'], null);
          break;

        case '/register':
          component = _react2['default'].createElement(_RegisterPage2['default'], null);
          break;
      }

      if (component) {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(_Header2['default'], null),
          component,
          _react2['default'].createElement(_Feedback2['default'], null),
          _react2['default'].createElement(_Footer2['default'], null)
        );
      }

      return _react2['default'].createElement(_NotFoundPage2['default'], null);
    }
  }], [{
    key: 'propTypes',
    value: {
      path: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  var _App = App;
  App = (0, _decoratorsWithStyles2['default'])(_AppLess2['default'])(App) || App;
  App = (0, _decoratorsWithContext2['default'])(App) || App;
  return App;
})();

exports['default'] = App;
module.exports = exports['default'];