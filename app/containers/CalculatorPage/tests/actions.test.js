import { CHANGE_EXPRESSIONS, CALCULATE } from '../constants';
import { changeExpression, evaluatePostFix } from '../actions';
describe('Test calculator action', () => {
  it('changeExpression', () => {
    const exp = 'abc';
    const expectResult = {
      type: CHANGE_EXPRESSIONS,
      value: exp,
    };
    expect(changeExpression(exp)).toEqual(expectResult);
  });
  // export function evaluatePostFix(value) {
  //   const result = caculatorResult(value);
  //   return {
  //     type: CALCULATE,
  //     value: result,
  //   };
  // }
  it('evaluatePostFix', () => {
    const param = [0];
    const exp = 0;
    const expectResult = {
      type: CALCULATE,
      value: exp,
    };
    expect(evaluatePostFix(param)).toEqual(expectResult);
  });
});
