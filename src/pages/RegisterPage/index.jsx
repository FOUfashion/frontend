import React from 'react';
import {Form} from 'formsy-react';

import Paper from '../../components/Paper';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Logo from '../../components/Logo';

import request from 'superagent';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Sign Up')
class RegisterPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onValidSubmit = (model) => {
    console.log(model);

    request
      .get('/api/profile')
      .query({ email: model.email })
      .end(::console.log);
  }

  onInvalidSubmit = () => {
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
    const errors = {
      email: 'Please use a valid email address.',
      username: '4-12 letters and numbers only.',
      password: 'Use at least 6 characters.',
      name: 'Please use a valid name.'
    };

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Logo className={styles.logo} styled />
          <Paper className={styles.paper}>
            <h3 className={styles.title}>SIGN UP</h3>
            <Form onValidSubmit={this.onValidSubmit} onInvalidSubmit={this.onInvalidSubmit}>
              <div className={styles.names}>
                <FormInput fullWidth shake={this.state.shouldShake} name="firstName" className={styles.nameField}
                  floatingLabelText="First Name" validations="isWords" validationError={errors.name} style={{width: undefined}} required />
                <FormInput fullWidth shake={this.state.shouldShake} name="lastName" className={styles.nameField}
                  floatingLabelText="Last Name" validations="isWords" validationError={errors.name} style={{width: undefined}} required />
              </div>

              <FormInput fullWidth floatingLabelText="Email" shake={this.state.shouldShake}
                name="email" validations="isEmail" validationError={errors.email} required />
              <FormInput fullWidth floatingLabelText="Username" shake={this.state.shouldShake}
                name="username" validations="isUsername" validationError={errors.username} required />
              <FormInput fullWidth floatingLabelText="Password" shake={this.state.shouldShake}
                name="password" validations="isPassword" validationError={errors.password} required password />

              <p className={styles.consent}>By signing up you agree to our<br /><u>Terms of Service</u> and <u>Privacy Policy</u>.</p>

              <div className={styles.buttons}>
                <Button className={styles.button} type="submit" formNoValidate>SIGN UP</Button>
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
