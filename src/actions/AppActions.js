import ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';

export async function userSignedIn(actionContext, account) {
  actionContext.dispatch(ActionTypes.USER_SIGNED_IN, new Immutable.Map(account));
}
