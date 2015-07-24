import './styles.scss';

import React from 'react';
import {RouteHandler} from 'react-router';
import muiTheme from '../../decorators/muiTheme';

import {RaisedButton} from 'material-ui';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

@muiTheme
class App extends React.Component {



  render() {
    return (
      <div>
        <Header />
        <RaisedButton>Default</RaisedButton>
        <RouteHandler/>
        <Footer />
      </div>
    );
  }

}

export default App;
