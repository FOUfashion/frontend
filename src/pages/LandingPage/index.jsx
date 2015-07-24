import React from 'react';
import Logo from '../../components/Logo';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Fou')
class LandingPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Logo className={styles.logo} />
        </div>
      </div>
    );
  }

}

export default LandingPage;
