import React, {PropTypes} from 'react';
import styles from './styles.scss';

class RegisterPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default RegisterPage;
