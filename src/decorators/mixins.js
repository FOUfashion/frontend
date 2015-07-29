import reactMixin from 'react-mixin';

/**
 * Bind the methods to the component's scope.
 */
function autobind(methodNames) {
  return {
    componentWillMount() {
      methodNames.forEach(name => {
        if (typeof this[name] === 'function') {
          this[name] = this[name].bind(this);
        }
      });
    }
  };
}

/**
 * Adds support for mixins by manually copying its methods into the component.
 */
function mixinsDecorator(...mixins) {
  return (ComposedComponent) => {
    mixins.forEach(mixin => {
      reactMixin.onClass(ComposedComponent, mixin);
      reactMixin.onClass(ComposedComponent, autobind(Object.keys(mixin)));
    });

    return ComposedComponent;
  };
}

export default mixinsDecorator;
