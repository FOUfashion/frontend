import React, {PropTypes} from 'react';
import styles from './styles.scss';

class NotFoundPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired
  };

  render() {
    const title = 'Page Not Found';
    this.context.onSetTitle(title);
    this.context.onPageNotFound();
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <h1>{title}</h1>
          <p>Sorry, but the page you were trying to view does not exist.</p>
        </div>
      </div>
    );
  }

}

export default NotFoundPage;
