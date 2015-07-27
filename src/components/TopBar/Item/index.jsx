import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import classNames from 'classnames';
import styles from './styles.scss';

class Item extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.string,
    float: PropTypes.oneOf(['left', 'right'])
  }

  render() {
    const {children, className, href, float, ...props} = this.props;
    const classes = classNames(styles.link, styles[float], className);

    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

}

export default Item;
