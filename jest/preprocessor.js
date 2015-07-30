var mockedStyles = require('./mockedStyles');
var styles = JSON.stringify(mockedStyles);

/**
 * Replace unsupported `require` statements with an empty object.
 */
module.exports = {
  process: function(src, filename) {
    if (!filename.includes('/node_modules/')) {
      return src.replace(/require\('.*?\.scss'\)/g, styles);
    }

    return src;
  }
};
