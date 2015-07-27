import React, {PropTypes} from 'react';

import classNames from 'classnames';
import styles from './styles.scss';

class Card extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  render() {
    const {className, ...props} = this.props;
    return (<div className={classNames(styles.paper, className)} {...props}>{this.props.children}</div>);
  }

}

export default Card;
