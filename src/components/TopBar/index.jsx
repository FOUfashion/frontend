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
    isSignedIn: PropTypes.bool,
    account: ImmutablePropTypes.map
  }

  render() {
    const {className, ...props} = this.props;
    const classes = classNames(styles.topBar, className);

    let userItem;
    if (this.props.isSignedIn) {
      const name = this.props.account.get('profile').get('name').get('first');
      userItem = (
        <Item href="/me" float="right" className={styles.profileItem}>
          <Avatar size={28}>{name[0]}</Avatar>
          <span className={styles.profileName}>{name}</span>
        </Item>
      );
    }

    return (
      <Paper className={classes} {...props}>
        <Item href="/feed" float="left">
          <Logo className={styles.logo} styled />
        </Item>

        <Item href="/logout" float="right">
          <img src={require('../../images/actions/exit.svg')} />
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

        {userItem}
      </Paper>
    );
  }

}

export default TopBar;
