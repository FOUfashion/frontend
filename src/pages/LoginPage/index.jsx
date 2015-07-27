import React from 'react';
import {TextField} from 'material-ui';

import Card from '../../components/Card';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Sign In')
class LoginPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
        <Logo className={styles.logo} styled />
        <Card className={styles.card}>
          <h2 className={styles.title}>Sign In</h2>
          <form className={styles.form}>
            <TextField fullWidth zDepth={0} floatingLabelText="Username" />
            <TextField fullWidth zDepth={0} floatingLabelText="Password"><input type="password" /></TextField>
            <p className={styles.consent}>By signing up you agree to our<br /><u>Terms of Service</u> and <u>Privacy Policy</u>.</p>
            <div className={styles.buttons}>
              <Button className={styles.button} type={'submit'}>SIGN IN</Button>
              <Button className={styles.button} link href={'/register'} outline>SIGN UP</Button>
            </div>
          </form>
        </Card>
      </div>
      </div>
    );
  }

}

export default LoginPage;
