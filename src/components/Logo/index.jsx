import React, {PropTypes} from 'react';

class Logo extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  render() {
    return (
      <img src={require('../../images/logo.svg')} style={this.props} />
    );
  }

}

export default Logo;
