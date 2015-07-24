import './styles.scss';

import React from 'react';
import {RouteHandler} from 'react-router';
//import muiTheme from '../../decorators/muiTheme';

import {Button} from 'belle';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

//@muiTheme
class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Button>Default</Button>
        <RouteHandler/>
        <Footer />
      </div>
    );
  }

}

export default App;
