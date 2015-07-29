import 'normalize.css/normalize.css';
import styles from './styles.scss';

import React, {PropTypes} from 'react';
import TimeoutTransitionGroup from 'timeout-transition-group';

class App extends React.Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    children: PropTypes.node
  }

  render() {
    return (
      <TimeoutTransitionGroup enterTimeout={600} leaveTimeout={400} transitionName="routerTransition" className={styles.app}>
        <div key={this.props.location.pathname}>
          {this.props.children}
        </div>
      </TimeoutTransitionGroup>
    );
  }

}

export default App;
