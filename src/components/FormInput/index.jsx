import React, {PropTypes} from 'react';
import {TextField} from 'material-ui';
import Formsy from 'formsy-react';
import './validations';

import mixin from '../../decorators/mixin';
import classNames from 'classnames';
import styles from './styles.scss';

@mixin(Formsy.Mixin)
class FormInput extends React.Component {

  static propTypes = {
    shake: PropTypes.bool,
    password: PropTypes.bool,
    className: PropTypes.string
  }

  render() {
    const children = this.props.password ? <input type="password" /> : undefined;
    const {className, ...props} = this.props;
    let classes = classNames(className);

    if (this.props.shake && this.showRequired()) {
      classes = classNames(classes, styles.shake);
    }

    return (
      <TextField
        className={classes}
        errorText={this.getErrorMessage()}
        onChange={event => this.setValue(event.currentTarget.value)}
        value={this.getValue()}
        {...props}>
          {children}
      </TextField>
    );
  }

}

export default FormInput;
