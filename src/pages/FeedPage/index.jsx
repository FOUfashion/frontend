import React from 'react';

import Feed from '../../components/Feed';
import Header from '../../components/Header';
import MenuBar from '../../components/MenuBar';
import ChatBar from '../../components/ChatBar';

import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Fou')
class FeedPage extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <Header className={styles.header} />
        <div className={styles.content}>
          <MenuBar className={styles.menuBar} />
          <Feed className={styles.feed} />
          <ChatBar className={styles.chatBar} />
        </div>
      </div>
    );
  }

}

export default FeedPage;
