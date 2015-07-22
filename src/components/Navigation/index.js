import React, {PropTypes} from 'react';
import Link from '../../utils/Link';

import classNames from 'classnames';
import styles from './styles.scss';

class Navigation {

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <nav className={classNames(this.props.className, styles.nav)} role="navigation">
        <a className={styles.link} href="/about" onClick={Link.handleClick}>About</a>
        <a className={styles.link} href="/contact" onClick={Link.handleClick}>Contact</a>
        <span className={styles.spacer}> | </span>
        <a className={styles.link} href="/login" onClick={Link.handleClick}>Log in</a>
        <span className={styles.spacer}>or</span>
        <a className={styles.link_highlight} href="/register" onClick={Link.handleClick}>Sign up</a>
      </nav>
    );
  }

}

export default Navigation;
