import React from 'react';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Fou')
class LandingPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default LandingPage;
