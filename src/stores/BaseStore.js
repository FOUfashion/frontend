import FluxibleBaseStore from 'fluxible/addons/BaseStore';
import Immutable from 'immutable';

class BaseStore extends FluxibleBaseStore {

  constructor(dispatcher) {
    super(dispatcher);
    this.state = {};
  }

  dehydrate() {
    return this.state;
  }

  rehydrate(state) {
    Object.entries(state).forEach(([k, v]) => {
      this.state[k] = Immutable.fromJS(v);
    });
  }

}

export default BaseStore;
