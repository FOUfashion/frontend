import Formsy from 'formsy-react';

Formsy.addValidationRule('isUsername', function(values, value) {
  return value && /^[a-zA-Z0-9]{4,12}$/.test(value);
});

Formsy.addValidationRule('isPassword', function(values, value) {
  return value && /^.{6,32}$/.test(value);
});
