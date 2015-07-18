'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _coreDispatcher = require('../core/Dispatcher');

var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);

var _constantsActionTypes = require('../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var CHANGE_EVENT = 'change';

var pages = {};
var loading = false;

var AppStore = Object.assign({}, _eventemitter32['default'].prototype, {

  isLoading: function isLoading() {
    return loading;
  },

  /**
   * Gets page data by the given URL path.
   *
   * @param {String} path URL path.
   * @returns {*} Page data.
   */
  getPage: function getPage(path) {
    return path in pages ? pages[path] : null;
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange: function emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  onChange: function onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  off: function off(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppStore.dispatchToken = _coreDispatcher2['default'].register(function (action) {

  switch (action.type) {

    case _constantsActionTypes2['default'].GET_PAGE:
      loading = true;
      AppStore.emitChange();
      break;

    case _constantsActionTypes2['default'].RECEIVE_PAGE:
      loading = false;

      if (!action.err) {
        pages[action.page.path] = action.page;
      }

      AppStore.emitChange();
      break;

    default:
    // Do nothing

  }
});

exports['default'] = AppStore;
module.exports = exports['default'];