import React from 'react';
import {LeftNav, MenuItem} from 'material-ui';

import Feed from '../../components/Feed';
import TopBar from '../../components/TopBar';
import MenuBar from '../../components/MenuBar';
import ChatBar from '../../components/ChatBar';

import muiTheme from '../../decorators/muiTheme';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';
import {ctx} from '../../flux';

@muiTheme
@documentTitle('Fou')
class FeedPage extends React.Component {

  static childContextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      getStore: ctx.getStore.bind(ctx),
      executeAction: ctx.executeAction.bind(ctx)
    };
  }

  toggleNavBar = (e) => {
    e.stopPropagation();
    this.refs.leftNav.toggle();
  }

  onPageClick = (e) => {
    if (e.target.tagName === 'DIV' && e.target.style.backgroundColor === 'rgba(0, 0, 0, 0.541176)') {
      this.refs.leftNav.close();
    }
  }

  render() {
    const menuItems = [
      {
        type: MenuItem.Types.SUBHEADER,
        text: 'Fou'
      }, {
        route: 'feed',
        text: 'Feed'
      }, {
        route: 'messages',
        text: 'Messages'
      }, {
        route: 'profile',
        text: 'Profile'
      }, {
        type: MenuItem.Types.SUBHEADER,
        text: 'Account'
      }, {
        route: 'notifications',
        text: 'Notifications'
      }, {
        route: 'messages',
        text: 'Messages'
      }, {
        route: 'settings',
        text: 'Settings'
      }, {
        route: 'logout',
        text: 'Log out'
      }
    ];

    return (
      <div className={styles.page} onClick={this.onPageClick}>
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} style={{
          primary1Color: '#eee',
          disabledColor: '#eee',
          borderColor: '#eee',
          textColor: '#eee'
        }} />
        <TopBar className={styles.topBar} navBarHandler={this.toggleNavBar} />
        <div className={styles.container}>
          <MenuBar className={styles.menuBar} />
          <Feed className={styles.feed} />
          <ChatBar className={styles.chatBar} />
        </div>
      </div>
    );
  }

}

export default FeedPage;
