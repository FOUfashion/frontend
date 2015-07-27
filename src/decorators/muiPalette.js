import {ThemeManager} from './muiTheme';

function muiPalette(palette) {
  ThemeManager.setPalette(palette);
  return (ComposedComponent) => ComposedComponent;
}

export default muiPalette;
