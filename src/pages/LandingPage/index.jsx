import React from 'react';
import Logo from '../../components/Logo';
import documentTitle from '../../decorators/documentTitle';
import styles from './styles.scss';

@documentTitle('Fou')
class LandingPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <Logo className={styles.logo} />
      </div>
    );
  }

}

export default LandingPage;
