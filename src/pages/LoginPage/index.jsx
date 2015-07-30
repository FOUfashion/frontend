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

const log = debug('fou:login');

@muiTheme
@documentTitle('Sign In')
@mixins(Navigation)
class LoginPage extends React.Component {

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

  onValidSubmit = async (data) => {
    this.isLoading(true);
    log('onValidSubmit');

    try {
      const account = await request.post('/api/login').send(data).promise();
      await this.context.executeAction(AppActions.userSignedIn, account.body);

      log('account signed in', account);
      this.isLoading(false);

      // FIXME: AppActions.userSignedIn should be fired before the transition
      setTimeout(() => this.replaceWith('/feed'), 300);
    } catch(error) {
      this.isLoading(false);
      log('unexpected error', error);
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

  render() {
    const validations = {
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

    const errors = {
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

    return (
      <div className={styles.page}>
        <div className={styles.container}>
        <Logo className={styles.logo} styled />
        <Paper className={styles.paper}>
          <h3 className={styles.title}>SIGN IN</h3>
          <Form onValidSubmit={this.onValidSubmit} onInvalidSubmit={this.onInvalidSubmit}>
            <FormInput floatingLabelText="Username" shake={this.state.shouldShake}
              name="username" validations={validations.username} validationErrors={errors.username} required />
            <FormInput floatingLabelText="Password" shake={this.state.shouldShake}
              name="password" validations={validations.password} validationErrors={errors.password} required password />

            <div className={styles.buttons}>
              <Button className={styles.button} type="submit" loading={this.state.loading} formNoValidate>SIGN IN</Button>
              <Button className={styles.button} link href="/register" outline>SIGN UP</Button>
            </div>
          </Form>
        </Paper>
      </div>
      </div>
    );
  }

}

export default LoginPage;
