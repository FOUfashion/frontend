import React from 'react';

import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Fou')
class LandingPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.row}>
            <section className={styles.tile}>
              <span className={styles.logo}>FOU</span>
            </section>
            <section className={styles.tile}>
              <p className={styles.copy}>The social network for fashion designers. Built to inspire.</p>
            </section>
          </div>
          <div className={styles.row}>
            <section className={styles.tile}>
              <p className={styles.copy}>Discover new patterns, colours and ideas.</p>
            </section>
            <section className={styles.tile} />
          </div>
          <div className={styles.row}>
            <section className={styles.tile} />
            <section className={styles.tile}>
              <p className={styles.copy}>Get inspired by places, cultures and people.</p>
            </section>
          </div>
          <div className={styles.row}>
            <section className={styles.tile}>
              <p className={styles.copy}>Follow and chat with other designers.</p>
            </section>
            <section className={styles.tile} />
          </div>
          <div className={styles.callToActionBar}>

          </div>
          <footer className={styles.footer}>

          </footer>
        </div>
      </div>
    );
  }

}

export default LandingPage;
