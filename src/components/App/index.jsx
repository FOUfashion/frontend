import 'normalize.css/normalize.css';
import './styles.scss';

import React, {PropTypes} from 'react';
import {RouteHandler} from 'react-router';

import muiTheme from '../../decorators/muiTheme';
import muiPalette from '../../decorators/muiPalette';
import palette from '../../styling/palette';

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

@muiTheme
@muiPalette(palette)
class App extends React.Component {

  static propTypes = {
    path: PropTypes.string
  }

  render() {
    return (
      <CSSTransitionGroup transitionName='routerTransition' transitionAppear>
        <RouteHandler key={this.props.path} />
      </CSSTransitionGroup>
    );
  }

}

export default App;
