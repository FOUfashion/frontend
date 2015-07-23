import BaseStore from 'fluxible/addons/BaseStore';

class AppStore extends BaseStore {

  static storeName = 'AppStore'
  static handlers = {
    'INCREMENT': 'increment',
    'DECREMENT': 'decrement'
  };

  constructor(dispatcher) {
    super(dispatcher);
    this.count = 0;
  }

  increment() {
    this.count++;
    this.emitChange();
  }

  decrement() {
    this.count--;
    this.emitChange();
  }

  getCount() {
    return this.count;
  }

  dehydrate() {
    return {
      count: this.count
    };
  }

  rehydrate(state) {
    this.count = state.count;
  }

}

export default AppStore;
