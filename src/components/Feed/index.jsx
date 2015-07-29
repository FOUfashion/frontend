import React, {PropTypes} from 'react';

import Post from '../Post';

import classNames from 'classnames';
import styles from './styles.scss';

class Feed extends React.Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const {className, ...props} = this.props;
    const classes = classNames(styles.feed, className);

    const posts = [
      {
        id: '123',
        author: {
          name: {
            full: 'John Doe'
          },
          gravatarHash: 'HASH'
        },
        createdAt: new Date(),
        body: 'Test :)',
        imageUrl: 'http://www.gravatar.com/avatar/HASH5?s=1024&d=retro',
        likes: [
          {
            name: {
              full: 'Mike Nicholson'
            }
          }
        ]
      }, {
        id: '456',
        author: {
          name: {
            full: 'Diana Crane'
          },
          gravatarHash: 'HASH2'
        },
        createdAt: new Date(),
        body: 'This is awesome, guys.',
        imageUrl: 'http://www.gravatar.com/avatar/HASH3?s=1024&d=retro',
        likes: [
          {
            name: {
              full: 'Superman Sporty'
            }
          }
        ]
      }
    ];

    return (
      <ul className={classes}>
        {posts.map(function(post) {
          return (<Post post={post} key={post.id} />);
        })}
      </ul>
    );
  }

}

export default Feed;
