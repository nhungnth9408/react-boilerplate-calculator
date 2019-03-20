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

import { COUNT_NUMBER, CALCULATE } from './constants';

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

export function calculate(value) {
  const a = convertToArr(value);
  // console.log('Calculator action: ', a)
  return {
    type: CALCULATE,
    value: a,
  };
}

function convertToArr(newState) {
  const stack = [];
  // let newState = state.result.slice();
  let item = '';
  for (let i = 0; i < newState.length; i += 1) {
    if (operator(newState[i])) {
      item += newState[i];
    } else {
      if (item !== '') {
        stack.push(item);
      }
      stack.push(newState[i]);
      item = '';
    }
  }

  if (item !== '') {
    stack.push(item);
  }
  console.log('convertToArr: ', stack);
  return stack;
}

function toPostFix(value) {
  // implement
  const stack = [];
  const outString = [];
  const string = convertToArr(value);
  for (let i = 0; i < string.length; i += 1) {
    const c = string[i];
    if (operator(c)) {
      outString.push(c);
    } else {
      if (stack.length === 0 || c === '(') {
        stack.push(c);
      } else if (c === ')') {
        while (stack[stack.length - 1] !== '(') {
          outString.push(stack.pop());
        }
        stack.pop();
      } else {
        while (stack.length > 0 && hasHigherPrec(stack[stack.length - 1], c)) {
          outString.push(stack.pop());
        }
        stack.push(c);
      }
    }
  }
  while (stack.length !== 0) {
    outString.push(stack.pop());
  }
  console.log('toPostFix: ', outString);
  return outString;
}

function hasHigherPrec(v1, v2) {
  // debugger
  if (v1 === '(') {
    return false;
  }
  let prior1 = 0;
  let prior2 = 0;
  const operators = [
    { value: '+', prior: '1' },
    { value: '-', prior: '1' },
    { value: '*', prior: '2' },
    { value: '/', prior: '2' },
  ];
  operators.map(item => {
    if (item.value === v1) {
      prior1 = parseInt(item.prior, 10);
    }
    if (item.value === v2) {
      prior2 = parseInt(item.prior, 10);
    }
    // ???
    return 1;
  });
  if (prior1 >= prior2) {
    return true;
  }
  return false;
}

export function evaluatePostFix(value) {
  console.log('evaluatePostFix value: ', value);
  const arr = toPostFix(value);
  const stack = [];
  let i = 0;
  let o1;
  let o2;
  let operand;
  while (i < arr.length) {
    if (operator(arr[i])) {
      stack.push(arr[i]);
    } else {
      operand = arr[i];
      o2 = stack.pop();
      o1 = stack.pop();
      stack.push(cal(parseFloat(o1), parseFloat(o2), operand));
    }
    i += 1;
  }
  console.log('evaluatePostFix: ', stack);
  return {
    type: CALCULATE,
    value: stack,
  };
}

function operator(char) {
  if (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57) {
    return true;
  }
  return false;
}

function cal(par1, par2, type) {
  let result = 0;
  switch (type) {
    case '+':
      result = par1 + par2;
      break;
    case '-':
      result = par1 - par2;
      break;
    case '/':
      result = par1 / par2;
      break;
    case '*':
      result = par1 * par2;
      break;
    default:
      result = par1;
      break;
  }
  return result;
}
