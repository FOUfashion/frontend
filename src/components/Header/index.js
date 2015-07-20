import React from 'react';
import styles from './styles';
import Link from '../../utils/Link';
import Navigation from '../Navigation';

console.log(styles);

class Header {

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <a className={styles.brand} href="/" onClick={Link.handleClick}>
            <img className={styles.brandimg} src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className={styles.brandtxt}>Your Company</span>
          </a>
          <Navigation className={styles.nav} />
          <div className={styles.banner}>
            <h1 className={styles.bannertitle}>React</h1>
            <p className={styles.bannerdesc}>Complex web apps made easy</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
