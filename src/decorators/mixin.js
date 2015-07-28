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

function mixinDecorator(mixin) {
  return (ComposedComponent) => {
    reactMixin.onClass(ComposedComponent, mixin);
    reactMixin.onClass(ComposedComponent, autobind(Object.keys(mixin)));
  };
}

export default mixinDecorator;
