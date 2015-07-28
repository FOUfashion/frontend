import ActionTypes from '../constants/ActionTypes';

export default async function userSignedIn(actionContext, account) {
  actionContext.dispatch(ActionTypes.USER_SIGNED_IN, account);
}
