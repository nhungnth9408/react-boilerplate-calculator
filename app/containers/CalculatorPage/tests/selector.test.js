import { fromJS } from 'immutable';
import {
  selectCalculator,
  countNumber,
  getResult,
  selectExpression,
} from '../selectors';

describe('Test selector', () => {
  it('selectCalculator', () => {
    const stateEpected = fromJS({
      calculator: {},
    });
    const stateParam = fromJS({
      calculator: stateEpected,
    });
    expect(selectCalculator(stateParam)).toEqual(stateEpected);
  });

  it('countNumber', () => {
    const count = countNumber();
    const number = 0;
    const expectResult = fromJS({
      calculator: { number },
    });
    console.log('expectResult: ', count(expectResult));
    expect(count(expectResult)).toEqual(number);
  });

  it('getResult', () => {
    const get = getResult();
    const expectResult = 0;
    const param = fromJS({
      calculator: { expectResult },
    });
    console.log('expectResult 1: ', get(param));
    expect(get(param)).toEqual(expectResult);
  });

  it('selectExpression', () => {
    //   const selectExpression = () =>
    // createSelector(selectCalculator, homeState => homeState.get('expression'));
    const getExpression = selectExpression();
    const expectResult = [];
    const param = fromJS({
      calculator: { expectResult },
    });
    console.log('expectResult 2: ', getExpression(param));
    expect(getExpression(param)).toEqual(expectResult);
  });
});
