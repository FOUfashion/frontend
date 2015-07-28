import React, {PropTypes} from 'react';
import {Avatar} from 'material-ui';
import AppStore from '../../stores/AppStore';

import Item from './Item';
import Logo from '../Logo';
import Paper from '../Paper';

import connectToStores from 'fluxible-addons-react/connectToStores';
import classNames from 'classnames';
import styles from './styles.scss';

@connectToStores([AppStore], (context) => ({
  account: context.getStore(AppStore).getAccount()
}))
class TopBar extends React.Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  render() {
    const {className, account, ...props} = this.props;
    const classes = classNames(styles.topBar, className);

    return (
      <Paper className={classes} {...props}>
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
          <Avatar size={28}>{account.name.first[0]}</Avatar>
          <span className={styles.profileName}>{account.name.first}</span>
        </Item>
      </Paper>
    );
  }

}

export default TopBar;
