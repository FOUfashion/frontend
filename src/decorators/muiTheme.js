import React from 'react';
import palette from '../styling/palette';
import mui from 'material-ui';

/**
 * Wrap the component with a HoC that inserts the Material UI theme into the context.
 */
function muiTheme(ComposedComponent) {
  return class MuiThemeDecorator extends React.Component {

    static childContextTypes = {
      muiTheme: React.PropTypes.object
    }

    getChildContext() {
      const ThemeManager = new mui.Styles.ThemeManager();
      ThemeManager.setPalette(palette);

      const theme = ThemeManager.getCurrentTheme();
      theme.contentFontFamily = 'Helvetica, Arial, sans-serif';

      return {
        muiTheme: theme
      };
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  };
}

export default muiTheme;
