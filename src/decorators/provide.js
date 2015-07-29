import React from 'react';

function provide(providing) {
  return (ComposedComponent) => class ProvideDecorator {

    static childContextTypes = Object.entries(providing)
      .reduce((contextTypes, [k, v]) => {
        contextTypes[k] = v.type;
        return contextTypes;
      }, {});

    getChildContext() {
      return Object.entries(providing)
        .reduce((contextTypes, [k, v]) => {
          contextTypes[k] = v.value.call(this);
          return contextTypes;
        }, {});
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  };
}

export default provide;
