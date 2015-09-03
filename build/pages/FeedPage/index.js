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

var _materialUi = require('material-ui');

var _componentsFeed = require('../../components/Feed');

var _componentsFeed2 = _interopRequireDefault(_componentsFeed);

var _componentsTopBar = require('../../components/TopBar');

var _componentsTopBar2 = _interopRequireDefault(_componentsTopBar);

var _componentsMenuBar = require('../../components/MenuBar');

var _componentsMenuBar2 = _interopRequireDefault(_componentsMenuBar);

var _componentsChatBar = require('../../components/ChatBar');

var _componentsChatBar2 = _interopRequireDefault(_componentsChatBar);

var _decoratorsMuiTheme = require('../../decorators/muiTheme');

var _decoratorsMuiTheme2 = _interopRequireDefault(_decoratorsMuiTheme);

var _decoratorsDocumentTitle = require('../../decorators/documentTitle');

var _decoratorsDocumentTitle2 = _interopRequireDefault(_decoratorsDocumentTitle);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var _flux = require('../../flux');

var FeedPage = (function (_React$Component) {
  _inherits(FeedPage, _React$Component);

  function FeedPage() {
    var _this = this;

    _classCallCheck(this, _FeedPage);

    _get(Object.getPrototypeOf(_FeedPage.prototype), 'constructor', this).apply(this, arguments);

    this.toggleNavBar = function (e) {
      e.stopPropagation();
      _this.refs.leftNav.toggle();
    };

    this.onPageClick = function (e) {
      if (e.target.tagName === 'DIV' && e.target.style.backgroundColor === 'rgba(0, 0, 0, 0.541176)') {
        _this.refs.leftNav.close();
      }
    };
  }

  _createClass(FeedPage, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        getStore: _flux.ctx.getStore.bind(_flux.ctx),
        executeAction: _flux.ctx.executeAction.bind(_flux.ctx)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var menuItems = [{
        type: _materialUi.MenuItem.Types.SUBHEADER,
        text: 'Fou'
      }, {
        route: 'feed',
        text: 'Feed'
      }, {
        route: 'messages',
        text: 'Messages'
      }, {
        route: 'profile',
        text: 'Profile'
      }, {
        type: _materialUi.MenuItem.Types.SUBHEADER,
        text: 'Account'
      }, {
        route: 'notifications',
        text: 'Notifications'
      }, {
        route: 'messages',
        text: 'Messages'
      }, {
        route: 'settings',
        text: 'Settings'
      }, {
        route: 'logout',
        text: 'Log out'
      }];

      return _react2['default'].createElement(
        'div',
        { className: _stylesScss2['default'].page, onClick: this.onPageClick },
        _react2['default'].createElement(_materialUi.LeftNav, { ref: 'leftNav', docked: false, menuItems: menuItems, style: {
            primary1Color: '#eee',
            disabledColor: '#eee',
            borderColor: '#eee',
            textColor: '#eee'
          } }),
        _react2['default'].createElement(_componentsTopBar2['default'], { className: _stylesScss2['default'].topBar, navBarHandler: this.toggleNavBar }),
        _react2['default'].createElement(
          'div',
          { className: _stylesScss2['default'].container },
          _react2['default'].createElement(_componentsMenuBar2['default'], { className: _stylesScss2['default'].menuBar }),
          _react2['default'].createElement(_componentsFeed2['default'], { className: _stylesScss2['default'].feed }),
          _react2['default'].createElement(_componentsChatBar2['default'], { className: _stylesScss2['default'].chatBar })
        )
      );
    }
  }], [{
    key: 'childContextTypes',
    value: {
      executeAction: _react2['default'].PropTypes.func.isRequired,
      getStore: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _FeedPage = FeedPage;
  FeedPage = (0, _decoratorsDocumentTitle2['default'])('Fou')(FeedPage) || FeedPage;
  FeedPage = (0, _decoratorsMuiTheme2['default'])(FeedPage) || FeedPage;
  return FeedPage;
})(_react2['default'].Component);

exports['default'] = FeedPage;
module.exports = exports['default'];