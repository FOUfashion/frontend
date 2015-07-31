import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Avatar} from 'material-ui';
import AppStore from '../../stores/AppStore';

import Item from './Item';
import Logo from '../Logo';
import Paper from '../Paper';

import connectToStores from '../../decorators/connectToStores';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import styles from './styles.scss';

@connectToStores([AppStore], (appStore) => ({
  isSignedIn: appStore.isSignedIn(),
  account: appStore.getAccount()
}))
@pureRender
class TopBar extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    account: ImmutablePropTypes.map,
    navBarHandler: PropTypes.func
  }

  render() {
    const {className, ...props} = this.props;
    const classes = classNames(styles.topBar, className);
    const name = this.props.account.get('profile').get('name').get('first');

    return (
      <Paper className={classes} {...props}>
        <Item onClick={this.props.navBarHandler} external float="left" className={styles.hamburgerBtn}>
          <img src={require('../../images/actions/hamburger.svg')} />
        </Item>

        <Item href="/feed" external float="left">
          <Logo className={styles.logo} styled />
        </Item>

        <Item href="/logout" float="right" className={styles.logoutBtn}>
          <img src={require('../../images/actions/exit.svg')} />
        </Item>

        <Item href="/settings" float="right" className={styles.settingsBtn}>
          <img src={require('../../images/actions/cog.svg')} />
        </Item>

        <Item href="/messages" float="right" className={styles.messagesBtn}>
          <img src={require('../../images/actions/messages.svg')} />
        </Item>

        <Item href="/notifications" float="right" className={styles.notificationsBtn}>
          <img src={require('../../images/actions/bell.svg')} />
        </Item>

        <Item href="/me" float="right">
          <Avatar size={28}>{name[0]}</Avatar>
          <span className={styles.profileName}>{name}</span>
        </Item>
      </Paper>
    );
  }

}

export default TopBar;
