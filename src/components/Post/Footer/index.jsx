import React, {PropTypes} from 'react';
import styles from './styles.scss';

class Footer extends React.Component {

  static propTypes = {
    likes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.shape({
        full: PropTypes.string
      })
    })).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.shape({
        full: PropTypes.string
      })
    })).isRequired
  }

  render() {
    return (
      <div className={styles.footer}>
        <p className={styles.likes}>{this.props.likes} likes</p>
        <p className={styles.comments}>{this.props.comments} comments</p>
      </div>
    );
  }

}

export default Footer;
