'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactLibInvariant = require('react/lib/invariant');

var _reactLibInvariant2 = _interopRequireDefault(_reactLibInvariant);

var _actionsAppActions = require('../actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

function handleClick(event) {
  // If not left mouse click
  if (event.button !== 0) {
    return;
  }

  // If modified event
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return;
  }

  var el = event.currentTarget;
  (0, _reactLibInvariant2['default'])(el && el.nodeName === 'A', 'The target element must be a link.');

  // Rebuild path
  var path = el.pathname + el.search + (el.hash || '');

  event.preventDefault();
  _actionsAppActions2['default'].navigateTo(path);
}

exports['default'] = { handleClick: handleClick };
module.exports = exports['default'];