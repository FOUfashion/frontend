import React from 'react';
import Logo from '../../components/Logo';
import DarkButton from '../../components/DarkButton';

import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Fou')
class LandingPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Logo className={styles.logo} />
          <div className={styles.ribbon}>
            <p className={styles.item}>Discover new patterns, colours and ideas.</p>
            <p className={styles.item}>Get inspired by places, cultures and people.</p>
            <p className={styles.item}>Follow and chat with other designers.</p>
          </div>
          <div className={styles.buttons}>
            <DarkButton>SIGN UP</DarkButton>
          </div>
        </div>
      </div>
    );
  }

}

export default LandingPage;
