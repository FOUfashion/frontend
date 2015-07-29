import React from 'react';

function inject(injectables) {
  return (ComposedComponent) => {
    ComposedComponent.contextTypes = injectables;

    return class InjectDecorator {
      render() {
        return <ComposedComponent {...this.props} />;
      }
    };
  };
}

export default inject;
