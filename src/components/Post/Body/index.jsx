import React, {PropTypes} from 'react';
import styles from './styles.scss';

class Body extends React.Component {

  static propTypes = {
    body: PropTypes.string.isRequired
  }

  render() {
    return (
      <p className={styles.body}>{this.props.body}</p>
    );
  }

}

export default Body;
