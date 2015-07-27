import React, {PropTypes} from 'react';
import styles from './styles.scss';

class Header extends React.Component {

  static propTypes = {
    author: PropTypes.shape({
      name: PropTypes.shape({
        full: PropTypes.string
      })
    }).isRequired
  }

  render() {
    return (
      <h3 className={styles.header}>{this.props.author.name.full}</h3>
    );
  }

}

export default Header;
