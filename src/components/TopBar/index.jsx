import React, {PropTypes} from 'react';

import Item from './Item';
import Logo from '../Logo';
import Paper from '../Paper';

import classNames from 'classnames';
import styles from './styles.scss';

class TopBar extends React.Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const className = classNames(styles.topBar, this.props.className);

    return (
      <Paper className={className}>
        <Item href="/feed" float="left">
          <Logo className={styles.logo} styled />
        </Item>

        <Item href="/settings" float="right">
          <img src={require('../../images/actions/cog.svg')} />
        </Item>

        <Item href="/messages" float="right">
          <img src={require('../../images/actions/messages.svg')} />
        </Item>

        <Item href="/notifications" float="right">
          <img src={require('../../images/actions/bell.svg')} />
        </Item>

        <Item href="/me" float="right" className={styles.profileItem}>
          <img src="http://www.gravatar.com/avatar/HASH?s=28&d=retro" className={styles.profileAvatar} />
          <span className={styles.profileName}>Alexandru</span>
        </Item>
      </Paper>
    );
  }

}

export default TopBar;
