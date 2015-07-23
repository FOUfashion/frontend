import React from 'react';
import styles from './styles.scss';

class NotFoundPage extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <h1>Not Found</h1>
          <p>Sorry, but the page you were trying to view does not exist.</p>
        </div>
      </div>
    );
  }

}

export default NotFoundPage;
