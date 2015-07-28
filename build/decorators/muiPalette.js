'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _muiTheme = require('./muiTheme');

function muiPalette(palette) {
  _muiTheme.ThemeManager.setPalette(palette);
  return function (ComposedComponent) {
    return ComposedComponent;
  };
}

exports['default'] = muiPalette;
module.exports = exports['default'];