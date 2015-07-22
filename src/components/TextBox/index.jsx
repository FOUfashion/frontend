import React, {PropTypes} from 'react';
import styles from './styles.scss';

class TextBox {

  static propTypes = {
    maxLines: PropTypes.number
  };

  static defaultProps = {
    maxLines: 1
  };

  render() {
    return (
      <div className={styles.box}>
        {this.props.maxLines > 1 ?
          <textarea {...this.props} className={styles.input} ref="input" key="input" rows={this.props.maxLines} /> :
          <input {...this.props} className={styles.input} ref="input" key="input" />}
      </div>
    );
  }

}

export default TextBox;
