import React, {PropTypes} from 'react';
import emptyFunction from '../../node_modules/react/lib/emptyFunction';

function withContext(ComposedComponent) {
  return class WithContext {

    static propTypes = {
      context: PropTypes.shape({
        onSetTitle: PropTypes.func,
        onSetMeta: PropTypes.func,
        onPageNotFound: PropTypes.func
      })
    };

    static childContextTypes = {
      onSetTitle: PropTypes.func.isRequired,
      onSetMeta: PropTypes.func.isRequired,
      onPageNotFound: PropTypes.func.isRequired
    };

    getChildContext() {
      const context = this.props.context;
      return {
        onSetTitle: context.onSetTitle || emptyFunction,
        onSetMeta: context.onSetMeta || emptyFunction,
        onPageNotFound: context.onPageNotFound || emptyFunction
      };
    }

    render() {
      const { context, ...other } = this.props;
      return <ComposedComponent {...other} />;
    }

  };
}

export default withContext;
