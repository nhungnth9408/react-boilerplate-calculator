/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCalculator = state => state.get('calculator', initialState);

const countNumber = () =>
  createSelector(selectCalculator, homeState => homeState.get('number'));
const getResult = () =>
  createSelector(selectCalculator, homeState => homeState.get('result'));
const selectExpression = () =>
  createSelector(selectCalculator, homeState => homeState.get('expression'));
const makeSelectUsername = () =>
  createSelector(selectCalculator, homeState => homeState.get('username'));
export {
  selectCalculator,
  countNumber,
  getResult,
  selectExpression,
  makeSelectUsername,
};
