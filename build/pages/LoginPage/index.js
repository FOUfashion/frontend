'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _reactRouter = require('react-router');

var _actionsAppActions = require('../../actions/AppActions');

var AppActions = _interopRequireWildcard(_actionsAppActions);

var _componentsPaper = require('../../components/Paper');

var _componentsPaper2 = _interopRequireDefault(_componentsPaper);

var _componentsButton = require('../../components/Button');

var _componentsButton2 = _interopRequireDefault(_componentsButton);

var _componentsFormInput = require('../../components/FormInput');

var _componentsFormInput2 = _interopRequireDefault(_componentsFormInput);

var _componentsLogo = require('../../components/Logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var _decoratorsMixins = require('../../decorators/mixins');

var _decoratorsMixins2 = _interopRequireDefault(_decoratorsMixins);

var _decoratorsMuiTheme = require('../../decorators/muiTheme');

var _decoratorsMuiTheme2 = _interopRequireDefault(_decoratorsMuiTheme);

var _decoratorsDocumentTitle = require('../../decorators/documentTitle');

var _decoratorsDocumentTitle2 = _interopRequireDefault(_decoratorsDocumentTitle);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var log = (0, _debug2['default'])('fou:login');

var LoginPage = (function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  _createClass(LoginPage, null, [{
    key: 'contextTypes',
    value: {
      executeAction: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  function LoginPage(props) {
    var _this = this;

    _classCallCheck(this, _LoginPage);

    _get(Object.getPrototypeOf(_LoginPage.prototype), 'constructor', this).call(this, props);

    this.isLoading = function (loading) {
      log('isLoading', loading);
      _this.setState({
        loading: loading
      });
    };

    this.onValidSubmit = function callee$2$0(data) {
      var account;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this2 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.isLoading(true);
            log('onValidSubmit');

            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].post('/api/login').send(data).promise());

          case 5:
            account = context$3$0.sent;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(this.context.executeAction(AppActions.userSignedIn, account.body));

          case 8:

            log('account signed in', account);
            this.isLoading(false);

            // FIXME: AppActions.userSignedIn should be fired before the transition
            setTimeout(function () {
              return _this2.replaceWith('/feed');
            }, 300);
            context$3$0.next = 17;
            break;

          case 13:
            context$3$0.prev = 13;
            context$3$0.t0 = context$3$0['catch'](2);

            this.isLoading(false);

            if (context$3$0.t0.status === 401 || context$3$0.t0.status === 404) {
              this.setState({ error: 'Oops! Wrong credentials.' });
            } else {
              this.setState({ error: 'Unexpected error occured.' });
              log('unexpected error', context$3$0.t0);
            }

          case 17:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[2, 13]]);
    };

    this.onInvalidSubmit = function () {
      log('onInvalidSubmit');

      _this.setState({
        shouldShake: true
      });

      clearTimeout(_this.state.unshakeTimeout);
      _this.state.unshakeTimeout = setTimeout(function () {
        _this.setState({
          shouldShake: false
        });
      }, 500);
    };

    this.onChange = function () {
      _this.setState({ error: undefined });
    };

    this.state = {};
  }

  _createClass(LoginPage, [{
    key: 'render',
    value: function render() {
      var validations = {
        username: {
          isAlphanum: true,
          minLength: 4,
          maxLength: 12
        },
        password: {
          minLength: 6,
          maxLength: 32
        }
      };

      var errors = {
        username: {
          isAlphanum: 'Only letters and numbers are allowed.',
          minLength: 'Your username should be longer.',
          maxLength: 'Oops! Your username wasn\'t that long.'
        },
        password: {
          minLength: 'Your password should be longer.',
          maxLength: 'Oops! Your password wasn\'t that long.'
        }
      };

      var errorNotice = this.state.error ? _react2['default'].createElement(
        'p',
        { className: _stylesScss2['default'].errorNotice },
        this.state.error
      ) : undefined;

      return _react2['default'].createElement(
        'div',
        { className: _stylesScss2['default'].page },
        _react2['default'].createElement(
          'div',
          { className: _stylesScss2['default'].container },
          _react2['default'].createElement(_componentsLogo2['default'], { className: _stylesScss2['default'].logo, styled: true }),
          _react2['default'].createElement(
            _componentsPaper2['default'],
            { className: _stylesScss2['default'].paper },
            _react2['default'].createElement(
              'h3',
              { className: _stylesScss2['default'].title },
              'SIGN IN'
            ),
            _react2['default'].createElement(
              _formsyReact.Form,
              { onValidSubmit: this.onValidSubmit, onInvalidSubmit: this.onInvalidSubmit, onChange: this.onChange },
              _react2['default'].createElement(_componentsFormInput2['default'], { floatingLabelText: "Username", shake: this.state.shouldShake,
                name: "username", validations: validations.username, validationErrors: errors.username, required: true }),
              _react2['default'].createElement(_componentsFormInput2['default'], { floatingLabelText: "Password", shake: this.state.shouldShake,
                name: "password", validations: validations.password, validationErrors: errors.password, required: true, password: true }),
              errorNotice,
              _react2['default'].createElement(
                'div',
                { className: _stylesScss2['default'].buttons },
                _react2['default'].createElement(
                  _componentsButton2['default'],
                  { className: _stylesScss2['default'].button, type: "submit", loading: this.state.loading, formNoValidate: true },
                  'SIGN IN'
                ),
                _react2['default'].createElement(
                  _componentsButton2['default'],
                  { className: _stylesScss2['default'].button, link: true, href: "/register", outline: true },
                  'SIGN UP'
                )
              )
            )
          )
        )
      );
    }
  }]);

  var _LoginPage = LoginPage;
  LoginPage = (0, _decoratorsMixins2['default'])(_reactRouter.Navigation)(LoginPage) || LoginPage;
  LoginPage = (0, _decoratorsDocumentTitle2['default'])('Sign In')(LoginPage) || LoginPage;
  LoginPage = (0, _decoratorsMuiTheme2['default'])(LoginPage) || LoginPage;
  return LoginPage;
})(_react2['default'].Component);

exports['default'] = LoginPage;
module.exports = exports['default'];