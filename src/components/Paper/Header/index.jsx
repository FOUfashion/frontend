import React, {PropTypes} from 'react';

import classNames from 'classnames';
import styles from './styles.scss';

class Header extends React.Component {

  static propTypes = {
    children: PropTypes.string,
    className: PropTypes.string
  }

  render() {
    const {className, ...props} = this.props;
    const classes = classNames(styles.header, className);

    return (
      <h3 className={classes} {...props}>
        <span className={styles.text}>{this.props.children}</span>
      </h3>
    );
  }

}

export default Header;
