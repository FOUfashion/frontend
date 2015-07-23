import './styles.scss';

import React, {PropTypes} from 'react';
import provideContext from 'fluxible-addons-react/provideContext';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

@provideContext()
class App extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }

}

export default App;
