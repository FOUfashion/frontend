'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _reactRouter = require('react-router');

var _actionsAppActions = require('../../actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _componentsPaper = require('../../components/Paper');

var _componentsPaper2 = _interopRequireDefault(_componentsPaper);

var _componentsButton = require('../../components/Button');

var _componentsButton2 = _interopRequireDefault(_componentsButton);

var _componentsFormInput = require('../../components/FormInput');

var _componentsFormInput2 = _interopRequireDefault(_componentsFormInput);

var _componentsLogo = require('../../components/Logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _decoratorsMixin = require('../../decorators/mixin');

var _decoratorsMixin2 = _interopRequireDefault(_decoratorsMixin);

var _decoratorsDocumentTitle = require('../../decorators/documentTitle');

var _decoratorsDocumentTitle2 = _interopRequireDefault(_decoratorsDocumentTitle);

var _stylesScss = require('./styles.scss');

var _stylesScss2 = _interopRequireDefault(_stylesScss);

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
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.isLoading(true);
            log('onValidSubmit');

            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].get('/api/profile').query({ email: data.email }).promise());

          case 5:
            this.isLoading(false);
            log('email already taken');
            invalidateForm({
              email: 'This email is already registerd.'
            });
            context$3$0.next = 44;
            break;

          case 10:
            context$3$0.prev = 10;
            context$3$0.t0 = context$3$0['catch'](2);

            if (!(context$3$0.t0.status !== 404)) {
              context$3$0.next = 15;
              break;
            }

            this.isLoading(false);
            return context$3$0.abrupt('return', log('unexpected error', context$3$0.t0));

          case 15:

            log('email not taken, checking username');

            context$3$0.prev = 16;
            context$3$0.next = 19;
            return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].get('/api/account/' + data.username).promise());

          case 19:
            this.isLoading(false);
            log('username already taken');
            invalidateForm({
              username: 'This username is already registerd.'
            });
            context$3$0.next = 44;
            break;

          case 24:
            context$3$0.prev = 24;
            context$3$0.t1 = context$3$0['catch'](16);

            if (!(context$3$0.t1.status !== 404)) {
              context$3$0.next = 29;
              break;
            }

            this.isLoading(false);
            return context$3$0.abrupt('return', log('unexpected error', context$3$0.t1));

          case 29:

            log('username not taken, creating account');

            context$3$0.prev = 30;
            context$3$0.next = 33;
            return _regeneratorRuntime.awrap(_superagentBluebirdPromise2['default'].post('/api/account').send(data).promise());

          case 33:
            account = context$3$0.sent;

            this.context.executeAction(_actionsAppActions2['default'].USER_SIGNED_IN, account);
            log('account created', account);
            this.isLoading(false);
            this.replaceWith('/feed');
            context$3$0.next = 44;
            break;

          case 40:
            context$3$0.prev = 40;
            context$3$0.t2 = context$3$0['catch'](30);

            this.isLoading(false);
            log('unexpected error', context$3$0.t2);

          case 44:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[2, 10], [16, 24], [30, 40]]);
    };

    this.onInvalidSubmit = function () {
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
          isAlphanum: true,
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
              { onValidSubmit: this.onValidSubmit, onInvalidSubmit: this.onInvalidSubmit },
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
  RegisterPage = (0, _decoratorsMixin2['default'])(_reactRouter.Navigation)(RegisterPage) || RegisterPage;
  RegisterPage = (0, _decoratorsDocumentTitle2['default'])('Sign Up')(RegisterPage) || RegisterPage;
  return RegisterPage;
})(_react2['default'].Component);

exports['default'] = RegisterPage;
module.exports = exports['default'];