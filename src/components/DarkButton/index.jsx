import React, {PropTypes} from 'react';
import {RaisedButton} from 'material-ui';
import styling from '../../styling';

class DarkButton extends React.Component {

  static propTypes = {
    children: PropTypes.string,
    label: PropTypes.string
  }

  render() {
    return (
      <RaisedButton
        labelColor="#fff"
        label={this.props.children || this.props.label}
        backgroundColor={styling.colors.dark.main} />
    );
  }

}

export default DarkButton;
