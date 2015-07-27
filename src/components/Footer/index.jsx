import React, {PropTypes} from 'react';

import classNames from 'classnames';
import styles from './styles.scss';

class Footer extends React.Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    return (
      <footer className={classNames(styles.footer, this.props.className)}>
        <p className={styles.credits}>Designed and programmed with &lt;3 by <a href="http://www.aluxian.com" target="_blank">Alexandru Rosianu</a>.</p>
      </footer>
    );
  }

}

export default Footer;
