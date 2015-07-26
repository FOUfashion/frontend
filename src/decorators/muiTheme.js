import React from 'react';
import mui from 'material-ui';
import colors from '../colors';

const ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setPalette({
  primary1Color: colors.primary,
  disabledColor: '#555',
  borderColor: '#555',
  textColor: '#555'
});

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
      return <ComposedComponent />;
    }

  };
}

export default muiTheme;
