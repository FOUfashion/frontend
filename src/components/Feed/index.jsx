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
          title: 'Professional Designer'
        },
        createdAt: new Date(),
        body: 'Hey guys, look at this awesome pic. It\' my new wallpaper 😎',
        imageUrl: '//unsplash.it/600/300?random',
        likes: 64,
        comments: 12
      }, {
        id: '456',
        author: {
          name: {
            full: 'Diana Crane'
          },
          title: 'Model at Zara Inc.'
        },
        createdAt: new Date(),
        body: 'This is awesome. I\'d love to wear it, somehow...',
        imageUrl: '//unsplash.it/602/301?random',
        likes: 32,
        comments: 23
      }, {
        id: '789',
        author: {
          name: {
            full: 'Juliet Sinns'
          },
          title: 'Painter & Actress'
        },
        createdAt: new Date(),
        body: 'I\'m going to paint this, will keep you updated!',
        imageUrl: '//unsplash.it/604/302?random',
        likes: 96,
        comments: 143
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
