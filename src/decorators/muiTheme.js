import React from 'react';
import mui from 'material-ui';

function muiTheme(ComposedComponent) {
  class MuiThemeDecorator extends ComposedComponent {
    getChildContext() {
      const context = super.getChildContext && super.getChildContext() || {};
      context.muiTheme = new mui.Styles.ThemeManager().getCurrentTheme();
      return context;
    }
  }

  MuiThemeDecorator.childContextTypes = ComposedComponent.childContextTypes || {};
  MuiThemeDecorator.childContextTypes.muiTheme = React.PropTypes.object;

  return MuiThemeDecorator;
}

export default muiTheme;
