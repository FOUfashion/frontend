import ActionTypes from '../constants/ActionTypes';

export default async function incrementCounter(actionContext) {
  actionContext.dispatch(ActionTypes.INCREMENT);
}

export default async function decrementCounter(actionContext) {
  actionContext.dispatch(ActionTypes.DECREMENT);
}
