import React, {PropTypes} from 'react';
import styles from './styles.scss';

class Footer extends React.Component {

  static propTypes = {
    likes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.shape({
        full: PropTypes.string
      })
    })).isRequired
  }

  render() {
    return (
      <p className={styles.footer}>{this.props.likes.length} lightbulbs</p>
    );
  }

}

export default Footer;
