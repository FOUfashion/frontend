import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Avatar} from 'material-ui';

import styles from './styles.scss';

class List extends React.Component {

  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string
    })).isRequired
  }

  insertDividers(items) {
    const entries = [];

    items.forEach(function(item, index) {
      entries.push(
        <li>
          <Link to={item.href} className={styles.entry}>
            <Avatar size={30}>{item.name[0]}</Avatar>
            <span className={styles.text}>{item.name}</span>
          </Link>
        </li>
      );

      if (index < items.length - 1) {
        entries.push(<li className={styles.divider}></li>);
      }
    });

    return entries;
  }

  render() {
    const entries = this.insertDividers(this.props.entries);

    return (
      <ul className={styles.entries}>
        {entries}
      </ul>
    );
  }

}

export default List;
