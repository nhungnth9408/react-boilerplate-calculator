/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));
const countNumber = () =>
  createSelector(selectHome, homeState => homeState.get('number'));
export { selectHome, makeSelectUsername, countNumber };
