import React from 'react';
import styles from './styles.scss';

class Feedback {

  render() {
    return (
      <div className={styles.feedback}>
        <div className={styles.container}>
          <a className={styles.link} href="https://gitter.im/kriasoft/react-starter-kit">Ask a question</a>
          <span className={styles.spacer}>|</span>
          <a className={styles.link} href="https://github.com/kriasoft/react-starter-kit/issues/new">Report an issue</a>
        </div>
      </div>
    );
  }

}

export default Feedback;
