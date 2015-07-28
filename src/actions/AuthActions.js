import ActionTypes from '../constants/ActionTypes';

export default async function userSignedIn(actionContext, account) {
  actionContext.dispatch(ActionTypes.INCREMENT, account);
}
