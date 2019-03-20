/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_USERNAME, COUNT_NUMBER } from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  number: 12,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
    case COUNT_NUMBER:
      return state.set('number', state.get('number') + 1);
    default:
      return state;
  }
}

export default homeReducer;
