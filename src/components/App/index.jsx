import 'normalize.css/normalize.css';
import './styles.scss';

import React from 'react';
import {RouteHandler} from 'react-router';
// import {CSSTransitionGroup} from 'react/addons';
import muiTheme from '../../decorators/muiTheme';

@muiTheme
class App extends React.Component {

  render() {
    return (<RouteHandler />);
  }

}

export default App;
