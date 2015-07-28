/**
 * Replace unsupported `require` statements with an empty object.
 */
module.exports = {
  process: function(src, filename) {
    if (!filename.includes('/node_modules/')) {
      return src.replace(/require\('.*?\.scss'\)/g, '{}');
    }

    return src;
  }
};
