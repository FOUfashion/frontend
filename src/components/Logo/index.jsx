import React from 'react';

class Logo extends React.Component {

  render() {
    return <img src={require('../../images/logo.svg')} {...this.props} />;
  }

}

export default Logo;
