'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jade = require('jade');

var _jade2 = _interopRequireDefault(_jade);

var _frontMatter = require('front-matter');

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _constantsActionTypes = require('../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

// A folder with Jade/Markdown/HTML content pages
var CONTENT_DIR = _path2['default'].join(__dirname, './content');

// Check if that directory exists, print an error message if not
_fs2['default'].exists(CONTENT_DIR, function (exists) {
  if (!exists) {
    console.error('Error: Directory \'' + CONTENT_DIR + '\' does not exist.');
  }
});

// Extract 'front matter' metadata and generate HTML
function parseJade(uri, jadeContent) {
  var content = (0, _frontMatter2['default'])(jadeContent);
  var html = _jade2['default'].render(content.body, null, '  ');
  var page = Object.assign({ path: uri, content: html }, content.attributes);
  return page;
}

exports['default'] = {

  getPage: function getPage(uri) {
    // Read page content from a Jade file
    return new Promise(function (resolve) {
      var fileName = _path2['default'].join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.jade');

      _fs2['default'].readFile(fileName, { encoding: 'utf8' }, function (err, data) {
        if (err) {
          fileName = _path2['default'].join(CONTENT_DIR, uri + '/index.jade');
          _fs2['default'].readFile(fileName, { encoding: 'utf8' }, function (err2, data2) {
            resolve(err2 ? null : parseJade(uri, data2));
          });
        } else {
          resolve(parseJade(uri, data));
        }
      });
    }).then(function (page) {
      _Dispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].RECEIVE_PAGE,
        page: page
      });

      return Promise.resolve(page);
    });
  }

};
module.exports = exports['default'];