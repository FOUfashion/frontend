'use strict';

var _this2 = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel/polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./core/Dispatcher');

require('./stores/AppStore');

var _coreDatabase = require('./core/Database');

var _coreDatabase2 = _interopRequireDefault(_coreDatabase);

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var server = (0, _express2['default'])();

server.set('port', process.env.PORT || 5000);
server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/query', require('./api/query'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it
var templateFile = _path2['default'].join(__dirname, 'templates/index.html');
var template = _lodash2['default'].template(_fs2['default'].readFileSync(templateFile, 'utf8'));

server.get('*', function callee$0$0(req, res, next) {
  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap((function callee$1$0() {
          var notFound, css, data, app, html;
          return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(['/', '/about', '/privacy'].indexOf(req.path) !== -1)) {
                  context$2$0.next = 3;
                  break;
                }

                context$2$0.next = 3;
                return regeneratorRuntime.awrap(_coreDatabase2['default'].getPage(req.path));

              case 3:
                notFound = false;
                css = [];
                data = { description: '' };
                app = _react2['default'].createElement(_componentsApp2['default'], {
                  path: req.path,
                  context: {
                    onInsertCss: function onInsertCss(value) {
                      return css.push(value);
                    },
                    onSetTitle: function onSetTitle(value) {
                      return data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      return notFound = true;
                    }
                  } });

                data.body = _react2['default'].renderToString(app);
                data.css = css.join('');

                if (notFound) {
                  res.status(404);
                }

                html = template(data);

                res.send(html);

              case 12:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })());

      case 3:
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);

        next(context$1$0.t0);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2, [[0, 5]]);
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), function () {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});

// TODO: Temporary fix #159