/**
 * Imported .scss files will be replaced with a mockedStyles object.
 * All classes used in tests should be defined here. There WILL be conflicts.
 *
 * TODO: Find a way to process the .scss files through webpack and extract the class names.
 */
var styles = [
  'loader'
];

module.exports = styles.reduce(function(mockedStyles, style) {
  mockedStyles[style] = style;
  return mockedStyles;
}, {});
