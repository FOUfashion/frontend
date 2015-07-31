import React, {PropTypes} from 'react';
import {Avatar} from 'material-ui';

import styles from './styles.scss';

class Header extends React.Component {

  static propTypes = {
    author: PropTypes.shape({
      name: PropTypes.shape({
        full: PropTypes.string
      }),
      title: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    return (
      <div className={styles.header}>
        <Avatar className={styles.avatar}>{this.props.author.name.full[0]}</Avatar>
        <h3 className={styles.title}>
          {this.props.author.name.full}<br />
          <span className={styles.subtitle}>{this.props.author.title}</span>
        </h3>
      </div>
    );
  }

}

export default Header;
