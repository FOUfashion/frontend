import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';

class AppStore extends BaseStore {

  static storeName = 'AppStore'
  static handlers = {
    [ActionTypes.USER_SIGNED_IN]: '_userSignedIn',
    [ActionTypes.USER_SIGNED_OUT]: '_userSignedOut'
  };

  _userSignedIn(account) {
    this.state.account = account;
    this.state.isSignedIn = true;
    this.emitChange();
  }

  _userSignedOut() {
    this.state.account = undefined;
    this.state.isSignedIn = false;
    this.emitChange();
  }

  getAccount() {
    return this.state.account;
  }

  isSignedIn() {
    return !!this.state.isSignedIn;
  }

}

export default AppStore;
