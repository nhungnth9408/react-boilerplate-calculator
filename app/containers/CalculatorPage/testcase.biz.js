export default function convertToArr(newState) {
  const stack = [];
  let item = '';
  for (let i = 0; i < newState.length; i += 1) {
    const char = newState[i];
    // if (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57) {
    if (!isOperator(char)) {
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

export const isOperator = charactor =>
  ['(', ')', '+', '-', 'x', ':'].includes(charactor);

export const toPostFix = value => {
  // implement
  const stack = [];
  const outString = [];
  const string = convertToArr(value);
  for (let i = 0; i < string.length; i += 1) {
    const c = string[i];
    switch (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57) {
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
  let count = 0;
  const operators = [
    { value: '+', prior: '1' },
    { value: '-', prior: '1' },
    { value: '*', prior: '2' },
    { value: '/', prior: '2' },
  ];
  operators.map(item => {
    if (item.value === v1) {
      prior1 = parseInt(item.prior, 10);
      count += 1;
    }
    if (item.value === v2) {
      prior2 = parseInt(item.prior, 10);
      count += 1;
    }
    return count === 2;
  });
  return prior1 >= prior2;
  // if (prior1 >= prior2) {
  //   return true;
  // }
  // return false;
};
