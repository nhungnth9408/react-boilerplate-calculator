/**
 * value
 */
export default value => {
  const arr = toPostFix(value);
  const stack = [];
  let i = 0;
  let o1;
  let o2;
  let operand;
  while (i < arr.length) {
    if (isOperator(arr[i])) {
      stack.push(arr[i]);
    } else {
      operand = arr[i];
      o2 = stack.pop();
      o1 = stack.pop();
      stack.push(cal(parseFloat(o1), parseFloat(o2), operand));
    }
    i += 1;
  }
  const result = stack[0];
  return parseFloat(result);
};
/**
 *
 * @param {Array} newState
 */
export const convertToArr = newState => {
  const stack = [];
  // let newState = state.result.slice();
  let item = '';
  for (let i = 0; i < newState.length; i += 1) {
    if (isOperator(newState[i])) {
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
};
/**
 *
 * @param {Array} value
 */
export const toPostFix = value => {
  // implement
  const stack = [];
  const outString = [];
  const string = convertToArr(value);
  for (let i = 0; i < string.length; i += 1) {
    const c = string[i];
    switch (isOperator(c)) {
      case true:
        outString.push(c);
        break;
      default:
        if (stack.length === 0 || c === '(') {
          stack.push(c);
        } else if (c === ')') {
          while (stack[stack.length - 1] !== '(') {
            outString.push(stack.pop());
          }
          stack.pop();
        } else {
          while (
            stack.length > 0 &&
            hasHigherPrec(stack[stack.length - 1], c)
          ) {
            outString.push(stack.pop());
          }
          stack.push(c);
        }
        break;
    }
  }
  while (stack.length !== 0) {
    outString.push(stack.pop());
  }
  // console.log('toPostFix: ', outString);
  return outString;
};

export const hasHigherPrec = (v1, v2) => {
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
};

export const isOperator = char =>
  !['+', '/', '-', '*', '(', ')'].includes(char);
// export const isOperator = char => {
//   // ['+', '/', '-', '*', '(', ')'].includes(char);
//   if (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57) {
//     return true;
//   }
//   return false;
// };

export const cal = (par1, par2, type) => {
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
};
