import React, {PropTypes} from 'react';
import styles from './styles.scss';

class ContentPage {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          { this.props.path === '/' ? null : <h1>{this.props.title}</h1> }
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }

}

export default ContentPage;
