import React from 'react';

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

  render() {
    return (
      <div className={styles.page}>
        <TopBar className={styles.topBar} />
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
