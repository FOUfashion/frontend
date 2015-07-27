import React, {PropTypes} from 'react';

import Paper from '../Paper';
import Header from '../Paper/Header';
import List from '../Paper/List';

import classNames from 'classnames';
import styles from './styles.scss';

class ChatBar extends React.Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const className = classNames(styles.chatBar, this.props.className);
    const people = [
      {
        name: 'Sun Moore',
        href: '/people/username'
      }, {
        name: 'Jade Johnson',
        href: '/people/username'
      }, {
        name: 'Monica Düsseldorf',
        href: '/people/username'
      }, {
        name: 'George Anthony',
        href: '/people/username'
      }
    ];

    return (
      <Paper className={className}>
        <Header>CHAT</Header>
        <List entries={people} />
      </Paper>
    );
  }

}
export
default ChatBar;
