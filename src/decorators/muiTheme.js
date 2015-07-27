import React from 'react';
import mui from 'material-ui';

const ThemeManager = new mui.Styles.ThemeManager();

function muiTheme(ComposedComponent) {
  return class MuiThemeDecorator extends React.Component {

    static childContextTypes = {
      muiTheme: React.PropTypes.object
    }

    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  };
}

muiTheme.ThemeManager = ThemeManager;
export default muiTheme;
