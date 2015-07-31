import React, {PropTypes} from 'react';
import {Form} from 'formsy-react';
import {Navigation} from 'react-router';
import * as AppActions from '../../actions/AppActions';

import Paper from '../../components/Paper';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Logo from '../../components/Logo';

import mixins from '../../decorators/mixins';
import muiTheme from '../../decorators/muiTheme';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

import request from 'superagent-bluebird-promise';
import debug from 'debug';

const log = debug('fou:registration');

@muiTheme
@documentTitle('Sign Up')
@mixins(Navigation)
class RegisterPage extends React.Component {

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  isLoading = (loading) => {
    log('isLoading', loading);
    this.setState({
      loading: loading
    });
  }

  onValidSubmit = async (data, resetForm, invalidateForm) => {
    this.isLoading(true);
    log('onValidSubmit');

    try {
      await request.get('/api/profile/' + encodeURIComponent(data.email)).promise();
      this.isLoading(false);
      log('email already taken');
      invalidateForm({
        email: 'This email is already registerd.'
      });
    } catch(profileError) {
      if (profileError.status !== 404) {
        this.isLoading(false);
        this.setState({ error: 'Unexpected error occured.' });
        return log('unexpected error', profileError);
      }

      log('email not taken, checking username');

      try {
        await request.get('/api/account/' + encodeURIComponent(data.username)).promise();
        this.isLoading(false);
        log('username already taken');
        invalidateForm({
          username: 'This username is already registerd.'
        });
      } catch(accError) {
        if (accError.status !== 404) {
          this.isLoading(false);
          this.setState({ error: 'Unexpected error occured. Check the debug logs.' });
          return log('unexpected error', accError);
        }

        log('username not taken, creating account');

        try {
          const account = await request.post('/api/account').send(data).promise();
          await this.context.executeAction(AppActions.userSignedIn, account.body);

          log('account created', account);
          this.isLoading(false);

          // FIXME: AppActions.userSignedIn should be fired before the transition
          setTimeout(() => this.replaceWith('/feed'), 300);
        } catch(creationError) {
          this.isLoading(false);
          this.setState({ error: 'Unexpected error occured. Check the debug logs.' });
          log('unexpected error', creationError);
        }
      }
    }
  }

  onInvalidSubmit = () => {
    log('onInvalidSubmit');

    this.setState({
      shouldShake: true
    });

    clearTimeout(this.state.unshakeTimeout);
    this.state.unshakeTimeout = setTimeout(() => {
      this.setState({
        shouldShake: false
      });
    }, 500);
  }

  onChange = () => {
    this.setState({ error: undefined });
  }

  render() {
    const validations = {
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

    const errors = {
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

    const errorNotice = this.state.error ? (<p className={styles.errorNotice}>{this.state.error}</p>) : undefined;

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Logo className={styles.logo} styled />
          <Paper className={styles.paper}>
            <h3 className={styles.title}>SIGN UP</h3>
            <Form onValidSubmit={this.onValidSubmit} onInvalidSubmit={this.onInvalidSubmit} onChange={this.onChange}>
              <div className={styles.names}>
                <FormInput shake={this.state.shouldShake} name="firstName" className={styles.nameField}
                  floatingLabelText="First Name" validations={validations.name} validationErrors={errors.name} required />
                <FormInput shake={this.state.shouldShake} name="lastName" className={styles.nameField}
                  floatingLabelText="Last Name" validations={validations.name} validationErrors={errors.name} required />
              </div>

              <FormInput floatingLabelText="Email" shake={this.state.shouldShake}
                name="email" validations={validations.email} validationErrors={errors.email} required />
              <FormInput floatingLabelText="Username" shake={this.state.shouldShake}
                name="username" validations={validations.username} validationErrors={errors.username} required />
              <FormInput floatingLabelText="Password" shake={this.state.shouldShake}
                name="password" validations={validations.password} validationErrors={errors.password} required password />

              <p className={styles.consent}>By signing up you agree to our<br /><u>Terms of Service</u> and <u>Privacy Policy</u>.</p>

              {errorNotice}

              <div className={styles.buttons}>
                <Button className={styles.button} type="submit" loading={this.state.loading} formNoValidate>SIGN UP</Button>
                <Button className={styles.button} link href="/login" outline>SIGN IN</Button>
              </div>
            </Form>
          </Paper>
        </div>
      </div>
    );
  }

}

export default RegisterPage;
