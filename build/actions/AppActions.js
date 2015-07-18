'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _reactLibExecutionEnvironment = require('react/lib/ExecutionEnvironment');

var _coreDispatcher = require('../core/Dispatcher');

var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);

var _constantsActionTypes = require('../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

exports['default'] = {

  navigateTo: function navigateTo(path, options) {
    this.loadPage(path, function () {
      if (_reactLibExecutionEnvironment.canUseDOM) {
        if (options && options.replace) {
          window.history.replaceState({}, document.title, path);
        } else {
          window.history.pushState({}, document.title, path);
        }
      }

      _coreDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].CHANGE_LOCATION,
        path: path
      });
    });
  },

  loadPage: function loadPage(path, callback) {
    _coreDispatcher2['default'].dispatch({
      type: _constantsActionTypes2['default'].GET_PAGE,
      path: path
    });

    _superagent2['default'].get('/api/query?path=' + encodeURI(path)).accept('application/json').end(function (err, res) {
      _coreDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].RECEIVE_PAGE,
        path: path,
        err: err,
        page: res ? res.body : null
      });

      if (callback) {
        callback();
      }
    });
  }

};
module.exports = exports['default'];