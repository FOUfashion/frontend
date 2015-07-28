import FluxibleBaseStore from 'fluxible/addons/BaseStore';

class BaseStore extends FluxibleBaseStore {

  constructor(dispatcher) {
    super(dispatcher);
    this.state = {};
  }

  dehydrate() {
    return this.state;
  }

  rehydrate(state) {
    Object.assign(this.state, state);
  }

}

export default BaseStore;
