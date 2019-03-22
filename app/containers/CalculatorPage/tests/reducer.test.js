import { fromJS } from 'immutable';
import calculatorReducer from '../reducer';
import { changeExpression, evaluatePostFix } from '../actions';
describe('Test calculator', () => {
  // initState
  let state;
  beforeEach(() => {
    state = fromJS({
      number: 13,
      result: 5,
      // result: [],
      expression: [],
    });
  });
  it('Should be return initState', () => {
    const initState = state;
    expect(calculatorReducer(undefined, {})).toEqual(initState);
  });

  it('Should be return should handle the evaluatePostFix action correctly', () => {
    // action.exp
    const param = [0];
    const result = 0;
    // state.set('result', action.value);
    const expectResult = state.set('result', result);
    console.log('expectResult: ', evaluatePostFix(param));
    expect(calculatorReducer(state, evaluatePostFix(param))).toEqual(
      expectResult,
    );
  });

  it('Should be return should handle the changeExpression action correctly', () => {
    // action.exp
    const expression = [];
    const expectResult = state.set('expression', fromJS(expression));
    expect(calculatorReducer(state, changeExpression(expression))).toEqual(
      expectResult,
    );
  });
});
