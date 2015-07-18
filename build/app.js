'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel/polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fastclick = require('fastclick');

var _fastclick2 = _interopRequireDefault(_fastclick);

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _coreDispatcher = require('./core/Dispatcher');

var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);

var _actionsAppActions = require('./actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _constantsActionTypes = require('./constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var path = decodeURI(window.location.pathname);
var onSetMeta = function onSetMeta(name, content) {
  // Remove and create a new <meta /> tag in order to make it work
  // with bookmarks in Safari
  var elements = document.getElementsByTagName('meta');
  [].slice.call(elements).forEach(function (element) {
    if (element.getAttribute('name') === name) {
      element.parentNode.removeChild(element);
    }
  });

  var meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  document.getElementsByTagName('head')[0].appendChild(meta);
};

function run() {
  // Render the top-level React component
  var props = {
    path: path,
    context: {
      onSetTitle: function onSetTitle(value) {
        return document.title = value;
      },
      onSetMeta: onSetMeta
    }
  };

  var element = _react2['default'].createElement(_componentsApp2['default'], props);
  _react2['default'].render(element, document.getElementById('app'), function () {
    var css = document.getElementById('css');
    css.parentNode.removeChild(css);
  });

  // Update `Application.path` prop when `window.location` is changed
  _coreDispatcher2['default'].register(function (action) {
    if (action.type === _constantsActionTypes2['default'].CHANGE_LOCATION) {
      element = _react2['default'].cloneElement(element, { path: action.path });
      _react2['default'].render(element, document.getElementById('app'));
    }
  });
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([new Promise(function (resolve) {
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', resolve);
  } else {
    window.attachEvent('onload', resolve);
  }
}).then(function () {
  return _fastclick2['default'].attach(document.body);
}), new Promise(function (resolve) {
  return _actionsAppActions2['default'].loadPage(path, resolve);
})]).then(run);