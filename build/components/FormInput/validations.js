'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

_formsyReact2['default'].addValidationRule('isAlphanum', function (values, value) {
  return value && /^[a-zA-Z0-9]*$/.test(value);
});