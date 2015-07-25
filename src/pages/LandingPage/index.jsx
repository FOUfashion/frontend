import React from 'react';

import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

import Logo from '../../components/Logo';
import DarkButton from '../../components/DarkButton';

@documentTitle('Fou')
class LandingPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Logo className={styles.logo} />
          <div className={styles.ribbon}>
            <p className={styles.ribbonItem}>Discover new patterns, colours and ideas.</p>
            <p className={styles.ribbonItem}>Get inspired by places, cultures and people.</p>
            <p className={styles.ribbonItem}>Follow and chat with other designers.</p>
          </div>
          <div className={styles.buttons}>
            <DarkButton href="/login">SIGN IN</DarkButton>
            <DarkButton href="/register" link={true} outline={true} style={{marginLeft: 30}}>SIGN UP</DarkButton>
          </div>
        </div>
      </div>
    );
  }

}

export default LandingPage;
