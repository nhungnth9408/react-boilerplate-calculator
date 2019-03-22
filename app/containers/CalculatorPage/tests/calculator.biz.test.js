// import testcase, { isOperator, hasHigherPrec } from '../testcase.biz';
import calculator, {
  isOperator,
  hasHigherPrec,
  convertToArr,
  toPostFix,
  cal,
} from '../calculator.biz';

describe('Test conculator ', () => {
  it('isOperator - Should be return boolean type', () => {
    const param = '+';
    const expectedResult = false;
    expect(isOperator(param)).toBe(expectedResult);
  });

  it('convertToArr - Should be return a array', () => {
    const param = ['2', '+', '3', '2'];
    const expectedResult = ['2', '+', '32'];
    expect(convertToArr(param)).toEqual(expectedResult);
  });

  it('toPostFix - Should be return a array', () => {
    const param = ['2', '+', '3', '2'];
    const expectedResult = ['2', '32', '+'];
    expect(toPostFix(param)).toEqual(expectedResult);
  });

  it('final result - Should be return a array', () => {
    const param = ['2', '+', '3', '2'];
    const expectedResult = 34;
    expect(calculator(param)).toEqual(expectedResult);
  });

  it('hasHigherPrec - Should be return boolean type', () => {
    const param1 = '+';
    const param2 = '/';
    const expectedResult = false;
    expect(hasHigherPrec(param1, param2)).toBe(expectedResult);
    // expect(testcase(param1, param2)).toBe(expectedResult);
  });

  it('cal - Should be return a number', () => {
    const param1 = 11;
    const param2 = 2;
    const type = '/';
    const expectedResult = 5.5;
    expect(cal(param1, param2, type)).toBe(expectedResult);
    // expect(testcase(param1, param2)).toBe(expectedResult);
  });
});
