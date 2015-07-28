import Formsy from 'formsy-react';

Formsy.addValidationRule('isAlphanum', function(values, value) {
  return value && /^[a-zA-Z0-9]*$/.test(value);
});
