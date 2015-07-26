import React from 'react';

class Logo extends React.Component {

  render() {
    return <span {...this.props} dangerouslySetInnerHTML={{__html: require('../../images/logo.svg')}} />;
  }

}

export default Logo;
