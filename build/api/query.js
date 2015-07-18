'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _coreDatabase = require('../core/Database');

var _coreDatabase2 = _interopRequireDefault(_coreDatabase);

var router = new _express.Router();

router.get('/', function callee$0$0(req, res, next) {
  var path, page;
  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        path = req.query.path;

        if (!path) {
          res.status(400).send({ error: 'The \'path\' query parameter cannot be empty.' });
        }

        context$1$0.next = 5;
        return regeneratorRuntime.awrap(_coreDatabase2['default'].getPage(path));

      case 5:
        page = context$1$0.sent;

        if (page) {
          res.status(200).send(page);
        } else {
          res.status(404).send({ error: 'The page \'' + path + '\' is not found.' });
        }
        context$1$0.next = 12;
        break;

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](0);

        next(context$1$0.t0);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 9]]);
});

exports['default'] = router;
module.exports = exports['default'];