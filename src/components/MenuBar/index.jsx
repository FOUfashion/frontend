import React, {PropTypes} from 'react';

import Paper from '../Paper';
import Header from '../Paper/Header';
import List from '../Paper/List';

import classNames from 'classnames';
import styles from './styles.scss';

class MenuBar extends React.Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const classes = classNames(styles.chatBar, this.props.className);
    const entries = [
      {
        name: 'Feed',
        href: '/feed'
      }, {
        name: 'Messages',
        href: '/messages'
      }, {
        name: 'Profile',
        href: '/me'
      }
    ];

    return (
      <Paper className={classes}>
        <Header>MENU</Header>
        <List entries={entries} />
      </Paper>
    );
  }

}

export default MenuBar;
