import React from 'react';
import styles from './styles.scss';

class Footer {

  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.container}>
          <span className={styles.text}>© Your Company</span>
        </div>
      </div>
    );
  }

}

export default Footer;
