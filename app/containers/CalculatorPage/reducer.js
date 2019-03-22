/*
 * selectCalculator
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

import { COUNT_NUMBER, CALCULATE, CHANGE_EXPRESSIONS } from './constants';

// The initial state of the App
export const initialState = fromJS({
  number: 13,
  result: 5,
  expression: [],
});

function selectCalculator(state = initialState, action) {
  switch (action.type) {
    case COUNT_NUMBER:
      return state.set('number', state.get('number') + 1);
    case CALCULATE:
      return state.set('result', action.value);
    case CHANGE_EXPRESSIONS:
      return state.set('expression', fromJS(action.value));
    default:
      return state;
  }
}

export default selectCalculator;
