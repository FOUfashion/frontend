import React from 'react';
import Button from '../../components/Button';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Fou')
class LandingPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <section className={styles.row}>
            <p className={styles.logo}>FOU</p>
            <div className={styles.buttons}>
              <Button className={styles.button} light={true} outline={true} link={true} href={'/login'}>SIGN IN</Button>
              <Button className={styles.button} light={true} outline={true} link={true} href={'/register'}>SIGN UP</Button>
            </div>
            <p className={styles.tagline}>fashion.inspiration.</p>
          </section>
          <section className={styles.row}>
            <div className={styles.copy}>
              <p className={styles.line}>Discover new patterns,</p>
              <p className={styles.line}>colours and ideas.</p>
            </div>
          </section>
          <section className={styles.row}>
            <div className={styles.copy}>
              <p className={styles.line}><span>Get inspired by places,</span></p>
              <p className={styles.line}><span>cultures,</span></p>
              <p className={styles.line}><span>people.</span></p>
            </div>
          </section>
          <section className={styles.row}>
            <p className={styles.line}>Follow and chat with other designers.</p>
            <div className={styles.buttons}>
              <Button className={styles.button} light={true} outline={true} link={true} href={'/login'}>SIGN IN</Button>
              <Button className={styles.button} light={true} outline={true} link={true} href={'/register'}>SIGN UP</Button>
            </div>
          </section>
          <footer className={styles.footer}>
            <p className={styles.credits}>Designed and programmed with &lt;3 by <a href="http://www.aluxian.com" target="_blank">Alexandru Rosianu</a>.</p>
          </footer>
        </div>
      </div>
    );
  }

}

export default LandingPage;
