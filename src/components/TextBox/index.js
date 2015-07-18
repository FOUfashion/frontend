import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './TextBox.scss';

@withStyles(styles)
class TextBox {

  static propTypes = {
    maxLines: PropTypes.number
  };

  static defaultProps = {
    maxLines: 1
  };

  render() {
    return (
      <div className="TextBox">
        {this.props.maxLines > 1 ?
          <textarea {...this.props} className="TextBox-input" ref="input" key="input" rows={this.props.maxLines} /> :
          <input {...this.props} className="TextBox-input" ref="input" key="input" />}
      </div>
    );
  }

}

export default TextBox;
