import React from 'react';
import Link from '../../utils/Link';

import styles from './styles.scss';

class Footer {

  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.container}>
          <span className={styles.text}>© Your Company</span>
          <span className={styles.spacer}>·</span>
          <a className={styles.link} href="/" onClick={Link.handleClick}>Home</a>
          <span className={styles.spacer}>·</span>
          <a className={styles.link} href="/privacy" onClick={Link.handleClick}>Privacy</a>
          <span className={styles.spacer}>·</span>
          <a className={styles.link} href="/not-found" onClick={Link.handleClick}>Not Found</a>
        </div>
      </div>
    );
  }

}

export default Footer;
