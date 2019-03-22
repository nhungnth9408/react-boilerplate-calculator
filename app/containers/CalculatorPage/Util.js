// export default (p1, p2) => {
//   const p = p1 + p2;
//   return p;
// };

// convertToArr = (newState) => {
//   const stack = [];
//   // let newState = this.state.result.slice();
//   let item = '';
//   for (let i = 0; i < newState.length; i += 1) {
//     if (this.operator(newState[i])) {
//       item += newState[i];
//     } else {
//       if (item !== '') {
//         stack.push(item);
//       }
//       stack.push(newState[i]);
//       item = '';
//     }
//   }

//   if (item !== '') {
//     stack.push(item);
//   }
//   console.log(stack);
//   return stack;
// };

// toPostFix = () => {
//   // implement
//   const stack = [];
//   const outString = [];
//   const string = this.convertToArr();
//   for (let i = 0; i < string.length; i += 1) {
//     const c = string[i];
//     if (this.operator(c)) {
//       outString.push(c);
//     } else {
//       if (stack.length === 0 || c === '(') {
//         stack.push(c)
//       } else if (c === ')') {
//         while (stack[stack.length - 1] !== '(') {
//           outString.push(stack.pop());
//         }
//         stack.pop();
//       } else {
//         while ((stack.length > 0 && this.hasHigherPrec(stack[stack.length - 1], c))) {
//           outString.push(stack.pop());
//         }
//         stack.push(c);
//       }
//     }
//   }
//   while (stack.length !== 0) {
//     outString.push(stack.pop());
//   }
//   console.log(outString);
//   return outString;
// };

// export const hasHigherPrec = (v1, v2) => {
//   // debugger
//   if (v1 === '(') {
//     return false;
//   }
//   let prior1 = 0;
//   let prior2 = 0;
//   const operators = [
//     { value: '+', prior: '1' },
//     { value: '-', prior: '1' },
//     { value: '*', prior: '2' },
//     { value: '/', prior: '2' }
//   ];
//   operators.map((item, index) => {
//     if (item.value === v1) {
//       prior1 = parseInt(item.prior);
//     }
//     if (item.value === v2) {
//       prior2 = parseInt(item.prior);
//     }
//   });
//   if (prior1 >= prior2) {
//     return true;
//   }
//   return false;
// };

// caculator = (o1, o2, operand) => {
//   let result = 0;
//   switch (operand) {
//     case "+": result = o1 + o2; break;
//     case "-": result = o1 - o2; break;
//     case "*": result = o1 * o2; break;
//     case "/": result = o1 / o2; break;
//     default: result = 0; break;
//   }
//   return result;
// };

// evaluatePostFix = () => {
//   debugger
//   let arr = this.toPostFix();
//   let stack = [];
//   let i = 0;
//   let o1, o2, operand;
//   while (i < arr.length) {
//     if (operator(arr[i])) {
//       stack.push(arr[i]);
//     } else {
//       operand = arr[i];
//       o2 = stack.pop();
//       o1 = stack.pop();
//       stack.push(this.caculator(parseFloat(o1), parseFloat(o2), operand));
//     }
//     i += 1;
//   }
//   console.log(stack);
//   return stack;
// };

// const operator = char => {
//   if (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57) {
//     return true;
//   }
//   return false;
// };
// // import caculator, {mb} from './Calculator'
// // postfix, prefix, infix
