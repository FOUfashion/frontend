import reactMixin from 'react-mixin';

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

function mixinDecorator(...mixins) {
  return (ComposedComponent) => {
    mixins.forEach(mixin => {
      reactMixin.onClass(ComposedComponent, mixin);
      reactMixin.onClass(ComposedComponent, autobind(Object.keys(mixin)));
    });

    return ComposedComponent;
  };
}

export default mixinDecorator;
