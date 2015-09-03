'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _materialUi = require('material-ui');

var _storesAppStore = require('../../stores/AppStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _Logo = require('../Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _decoratorsConnectToStores = require('../../decorators/connectToStores');

var _decoratorsConnectToStores2 = _interopRequireDefault(_decoratorsConnectToStores);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var TopBar = (function (_React$Component) {
  _inherits(TopBar, _React$Component);

  function TopBar() {
    _classCallCheck(this, _TopBar);

    _get(Object.getPrototypeOf(_TopBar.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TopBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['className']);

      var classes = (0, _classnames2['default'])(_stylesScss2['default'].topBar, className);
      var name = this.props.account.get('profile').get('name').get('first');

      return _react2['default'].createElement(
        _Paper2['default'],
        _extends({ className: classes }, props),
        _react2['default'].createElement(
          _Item2['default'],
          { onClick: this.props.navBarHandler, external: true, float: 'left', className: _stylesScss2['default'].hamburgerBtn },
          _react2['default'].createElement('img', { src: require('../../images/actions/hamburger.svg') })
        ),
        _react2['default'].createElement(
          _Item2['default'],
          { href: '/feed', external: true, float: 'left' },
          _react2['default'].createElement(_Logo2['default'], { className: _stylesScss2['default'].logo, styled: true })
        ),
        _react2['default'].createElement(
          _Item2['default'],
          { href: '/logout', float: 'right', className: _stylesScss2['default'].logoutBtn },
          _react2['default'].createElement('img', { src: require('../../images/actions/exit.svg') })
        ),
        _react2['default'].createElement(
          _Item2['default'],
          { href: '/settings', float: 'right', className: _stylesScss2['default'].settingsBtn },
          _react2['default'].createElement('img', { src: require('../../images/actions/cog.svg') })
        ),
        _react2['default'].createElement(
          _Item2['default'],
          { href: '/messages', float: 'right', className: _stylesScss2['default'].messagesBtn },
          _react2['default'].createElement('img', { src: require('../../images/actions/messages.svg') })
        ),
        _react2['default'].createElement(
          _Item2['default'],
          { href: '/notifications', float: 'right', className: _stylesScss2['default'].notificationsBtn },
          _react2['default'].createElement('img', { src: require('../../images/actions/bell.svg') })
        ),
        _react2['default'].createElement(
          _Item2['default'],
          { href: '/me', float: 'right' },
          _react2['default'].createElement(
            _materialUi.Avatar,
            { size: 28 },
            name[0]
          ),
          _react2['default'].createElement(
            'span',
            { className: _stylesScss2['default'].profileName },
            name
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string,
      account: _reactImmutableProptypes2['default'].map,
      navBarHandler: _react.PropTypes.func
    },
    enumerable: true
  }]);

  var _TopBar = TopBar;
  TopBar = (0, _pureRenderDecorator2['default'])(TopBar) || TopBar;
  TopBar = (0, _decoratorsConnectToStores2['default'])([_storesAppStore2['default']], function (appStore) {
    return {
      isSignedIn: appStore.isSignedIn(),
      account: appStore.getAccount()
    };
  })(TopBar) || TopBar;
  return TopBar;
})(_react2['default'].Component);

exports['default'] = TopBar;
module.exports = exports['default'];