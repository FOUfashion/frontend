import React, {PropTypes} from 'react';

import classNames from 'classnames';
import styles from './styles.scss';

class Paper extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  render() {
    const {className, ...props} = this.props;
    const classes = classNames(styles.paper, className);

    return (
      <div className={classes} {...props}>
        {this.props.children}
      </div>
    );
  }

}

export default Paper;
