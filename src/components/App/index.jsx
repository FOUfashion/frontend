import './styles.scss';

import React from 'react';
import {RouteHandler} from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <RouteHandler/>
        <Footer />
      </div>
    );
  }

}

export default App;
