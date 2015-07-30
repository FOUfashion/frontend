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

var log = (0, _debug2['default'])('fou:registration');

var RegisterPage = (function (_React$Component) {
  _inherits(RegisterPage, _React$Component);

  _createClass(RegisterPage, null, [{
    key: 'contextTypes',
    value: {
      executeAction: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  function RegisterPage(props) {
    var _this = this;

    _classCallCheck(this, _RegisterPage);

    _get(Object.getPrototypeOf(_RegisterPage.prototype), 'constructor', this).call(this, props);

    this.isLoading = function (loading) {
      log('isLoading', loading);
      _this.setState({
        loading: loading
      });
    };

    this.onValidSubmit = function callee$2$0(data, resetForm, invalidateForm) {
      var account;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this2 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.isLoading(true);
            log('onValidSubmit');

            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].get('/api/profile/' + encodeURIComponent(this.request.body.email)).promise());

          case 5:
            this.isLoading(false);
            log('email already taken');
            invalidateForm({
              email: 'This email is already registerd.'
            });
            context$3$0.next = 48;
            break;

          case 10:
            context$3$0.prev = 10;
            context$3$0.t0 = context$3$0['catch'](2);

            if (!(context$3$0.t0.status !== 404)) {
              context$3$0.next = 16;
              break;
            }

            this.isLoading(false);
            this.setState({ error: 'Unexpected error occured.' });
            return context$3$0.abrupt('return', log('unexpected error', context$3$0.t0));

          case 16:

            log('email not taken, checking username');

            context$3$0.prev = 17;
            context$3$0.next = 20;
            return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].get('/api/account/' + encodeURIComponent(data.username)).promise());

          case 20:
            this.isLoading(false);
            log('username already taken');
            invalidateForm({
              username: 'This username is already registerd.'
            });
            context$3$0.next = 48;
            break;

          case 25:
            context$3$0.prev = 25;
            context$3$0.t1 = context$3$0['catch'](17);

            if (!(context$3$0.t1.status !== 404)) {
              context$3$0.next = 31;
              break;
            }

            this.isLoading(false);
            this.setState({ error: 'Unexpected error occured. Check the debug logs.' });
            return context$3$0.abrupt('return', log('unexpected error', context$3$0.t1));

          case 31:

            log('username not taken, creating account');

            context$3$0.prev = 32;
            context$3$0.next = 35;
            return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].post('/api/account').send(data).promise());

          case 35:
            account = context$3$0.sent;
            context$3$0.next = 38;
            return _regeneratorRuntime.awrap(this.context.executeAction(AppActions.userSignedIn, account.body));

          case 38:

            log('account created', account);
            this.isLoading(false);

            // FIXME: AppActions.userSignedIn should be fired before the transition
            setTimeout(function () {
              return _this2.replaceWith('/feed');
            }, 300);
            context$3$0.next = 48;
            break;

          case 43:
            context$3$0.prev = 43;
            context$3$0.t2 = context$3$0['catch'](32);

            this.isLoading(false);
            this.setState({ error: 'Unexpected error occured. Check the debug logs.' });
            log('unexpected error', context$3$0.t2);

          case 48:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[2, 10], [17, 25], [32, 43]]);
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

  _createClass(RegisterPage, [{
    key: 'render',
    value: function render() {
      var validations = {
        email: 'isEmail',
        username: {
          isAlphanum: true,
          minLength: 4,
          maxLength: 12
        },
        password: {
          minLength: 6,
          maxLength: 32
        },
        name: 'isWords,maxLength:32'
      };

      var errors = {
        email: {
          isEmail: 'Use a valid email address.'
        },
        username: {
          isAlphanum: 'Only letters and numbers are allowed.',
          minLength: 'Use a longer username.',
          maxLength: 'Oops! Your username is too long.'
        },
        password: {
          minLength: 'Use a longer password.',
          maxLength: 'Oops! Your password is too long.'
        },
        name: {
          isWords: 'Only letters are allowed.',
          maxLength: 'Oops! Your name is too long.'
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
              'SIGN UP'
            ),
            _react2['default'].createElement(
              _formsyReact.Form,
              { onValidSubmit: this.onValidSubmit, onInvalidSubmit: this.onInvalidSubmit, onChange: this.onChange },
              _react2['default'].createElement(
                'div',
                { className: _stylesScss2['default'].names },
                _react2['default'].createElement(_componentsFormInput2['default'], { shake: this.state.shouldShake, name: "firstName", className: _stylesScss2['default'].nameField,
                  floatingLabelText: "First Name", validations: validations.name, validationErrors: errors.name, required: true }),
                _react2['default'].createElement(_componentsFormInput2['default'], { shake: this.state.shouldShake, name: "lastName", className: _stylesScss2['default'].nameField,
                  floatingLabelText: "Last Name", validations: validations.name, validationErrors: errors.name, required: true })
              ),
              _react2['default'].createElement(_componentsFormInput2['default'], { floatingLabelText: "Email", shake: this.state.shouldShake,
                name: "email", validations: validations.email, validationErrors: errors.email, required: true }),
              _react2['default'].createElement(_componentsFormInput2['default'], { floatingLabelText: "Username", shake: this.state.shouldShake,
                name: "username", validations: validations.username, validationErrors: errors.username, required: true }),
              _react2['default'].createElement(_componentsFormInput2['default'], { floatingLabelText: "Password", shake: this.state.shouldShake,
                name: "password", validations: validations.password, validationErrors: errors.password, required: true, password: true }),
              _react2['default'].createElement(
                'p',
                { className: _stylesScss2['default'].consent },
                'By signing up you agree to our',
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(
                  'u',
                  null,
                  'Terms of Service'
                ),
                ' and ',
                _react2['default'].createElement(
                  'u',
                  null,
                  'Privacy Policy'
                ),
                '.'
              ),
              errorNotice,
              _react2['default'].createElement(
                'div',
                { className: _stylesScss2['default'].buttons },
                _react2['default'].createElement(
                  _componentsButton2['default'],
                  { className: _stylesScss2['default'].button, type: "submit", loading: this.state.loading, formNoValidate: true },
                  'SIGN UP'
                ),
                _react2['default'].createElement(
                  _componentsButton2['default'],
                  { className: _stylesScss2['default'].button, link: true, href: "/login", outline: true },
                  'SIGN IN'
                )
              )
            )
          )
        )
      );
    }
  }]);

  var _RegisterPage = RegisterPage;
  RegisterPage = (0, _decoratorsMixins2['default'])(_reactRouter.Navigation)(RegisterPage) || RegisterPage;
  RegisterPage = (0, _decoratorsDocumentTitle2['default'])('Sign Up')(RegisterPage) || RegisterPage;
  RegisterPage = (0, _decoratorsMuiTheme2['default'])(RegisterPage) || RegisterPage;
  return RegisterPage;
})(_react2['default'].Component);

exports['default'] = RegisterPage;
module.exports = exports['default'];