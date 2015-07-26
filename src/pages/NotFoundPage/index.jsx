import React from 'react';
import {Link} from 'react-router';
import styles from './styles.scss';

class NotFoundPage extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Link to="/" className={styles.link}>404.<br />inspiration<br />not<br />found</Link>
        </div>
      </div>
    );
  }

}

export default NotFoundPage;
