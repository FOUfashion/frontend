import 'normalize.css/normalize.css';
import styles from './styles.scss';

import React, {PropTypes} from 'react';
import {RouteHandler} from 'react-router';
import TimeoutTransitionGroup from 'timeout-transition-group';

import muiTheme from '../../decorators/muiTheme';
import muiPalette from '../../decorators/muiPalette';
import palette from '../../styling/palette';

@muiTheme
@muiPalette(palette)
class App extends React.Component {

  static propTypes = {
    path: PropTypes.string
  }

  render() {
    return (
      <TimeoutTransitionGroup enterTimeout={600} leaveTimeout={400} transitionName="routerTransition" className={styles.app}>
        <RouteHandler key={this.props.path} />
      </TimeoutTransitionGroup>
    );
  }

}

export default App;
