import React from 'react';
import styles from './styles.scss';

class Footer extends React.Component {

  render() {
    return (
      <footer className={styles.footer}>
        <p className={styles.credits}>Designed and programmed with &lt;3 by <a href="http://www.aluxian.com" target="_blank">Alexandru Rosianu</a>.</p>
      </footer>
    );
  }

}

export default Footer;
