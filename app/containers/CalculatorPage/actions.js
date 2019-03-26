/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import caculatorResult from './calculator.biz';
import {
  COUNT_NUMBER,
  CALCULATE,
  CHANGE_EXPRESSIONS,
  CHANGE_USERNAME,
} from './constants';

/**
 * Changes the input field of the form
 * @return {object}    An action object with a type of COUNT_NUMBER
 */
export function count() {
  // console.log('count');
  return {
    type: COUNT_NUMBER,
    // number,
  };
}
/**
 *
 * @param {Array} value: array include operators and operands
 */
export function evaluatePostFix(value) {
  const result = caculatorResult(value);
  return {
    type: CALCULATE,
    value: result,
  };
}
/**
 *
 * @param  {Array} exp The new text of the input field
 */
export function changeExpression(exp) {
  return {
    type: CHANGE_EXPRESSIONS,
    value: exp,
  };
}

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}
