import React, {PropTypes} from 'react';
import styles from './styles.scss';

class Media extends React.Component {

  static propTypes = {
    imageUrl: PropTypes.string.isRequired
  }

  render() {
    return (
      <img className={styles.image} src={this.props.imageUrl} />
    );
  }

}

export default Media;
