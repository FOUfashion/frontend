import React from 'react';
import {TextField} from 'material-ui';

import Paper from '../../components/Paper';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import muiTheme from '../../decorators/muiTheme';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@muiTheme
@documentTitle('Sign In')
class LoginPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
        <Logo className={styles.logo} styled />
        <Paper className={styles.paper}>
          <h3 className={styles.title}>SIGN IN</h3>
          <form className={styles.form}>
            <TextField fullWidth zDepth={0} floatingLabelText="Username" />
            <TextField fullWidth zDepth={0} floatingLabelText="Password"><input type="password" /></TextField>
            <p className={styles.consent}>By signing up you agree to our<br /><u>Terms of Service</u> and <u>Privacy Policy</u>.</p>
            <div className={styles.buttons}>
              <Button className={styles.button} type={'submit'}>SIGN IN</Button>
              <Button className={styles.button} link href={'/register'} outline>SIGN UP</Button>
            </div>
          </form>
        </Paper>
      </div>
      </div>
    );
  }

}

export default LoginPage;
