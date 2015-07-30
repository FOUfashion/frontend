import ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';
import debug from 'debug';

const log = debug('fou:AppActions');

export async function userSignedIn(actionContext, account) {
  log('userSignedIn');
  actionContext.dispatch(ActionTypes.USER_SIGNED_IN, Immutable.fromJS(account));
}

export async function userSignedOut(actionContext) {
  log('userSignedOut');
  actionContext.dispatch(ActionTypes.USER_SIGNED_OUT);
}

export async function serverInit(actionContext, state) {
  log('serverInit');

  if (state.account) {
    await actionContext.executeAction(userSignedIn, state.account);
  }
}
