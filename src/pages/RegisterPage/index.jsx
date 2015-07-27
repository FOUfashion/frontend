import React from 'react';
import {TextField} from 'material-ui';

import Card from '../../components/Card';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Sign Up')
class RegisterPage extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <Logo className={styles.logo} styled />
        <Card className={styles.card}>
          <h2 className={styles.title}>Sign Up</h2>
          <form className={styles.form}>
            <div className={styles.names}>
              <TextField className={styles.nameField} style={{width: undefined}} floatingLabelText="First Name" />
              <TextField className={styles.nameField} style={{width: undefined}} floatingLabelText="Last Name" />
            </div>
            <TextField fullWidth floatingLabelText="Email" />
            <TextField fullWidth floatingLabelText="Username" />
            <TextField fullWidth floatingLabelText="Password"><input type="password" /></TextField>
            <p className={styles.consent}>By signing up you agree to our<br /><u>Terms of Service</u> and <u>Privacy Policy</u>.</p>
            <div className={styles.buttons}>
              <Button className={styles.button} type={'submit'}>SIGN UP</Button>
              <Button className={styles.button} link href={'/login'} outline>SIGN IN</Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

}

export default RegisterPage;
