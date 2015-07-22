import React from 'react';
import Navigation from '../Navigation';
import Link from '../../utils/Link';

import styles from './styles.scss';

class Header {

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <a className={styles.brand} href="/" onClick={Link.handleClick}>
            <img className={styles.brandImage} src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className={styles.brandText}>Your Company</span>
          </a>
          <Navigation className={styles.nav} />
          <div className={styles.banner}>
            <h1 className={styles.bannerTitle}>React</h1>
            <p className={styles.bannerDescription}>Complex web apps made easy</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
