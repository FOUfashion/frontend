import React, {PropTypes} from 'react';

import Paper from '../Paper';
import Header from './Header';
import Footer from './Footer';
import Media from './Media';
import Body from './Body';

import styles from './styles.scss';

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      author: PropTypes.shape({
        name: PropTypes.shape({
          full: PropTypes.string
        }),
        gravatarHash: PropTypes.string
      }),
      createdAt: PropTypes.date,
      body: PropTypes.string,
      imageUrl: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.shape({
          full: PropTypes.string
        })
      }))
    }).isRequired
  }

  render() {
    return (
      <Paper className={styles.post}>
        <Header {...this.props.post} />
        <Body {...this.props.post} />
        <Media {...this.props.post} />
        <Footer {...this.props.post} />
      </Paper>
    );
  }

}

export default Post;
