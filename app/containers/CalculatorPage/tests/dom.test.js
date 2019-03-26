import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { Calculator, mapDispatchToProps } from '../Calculator';
import { changeExpression, evaluatePostFix, count } from '../actions';
describe('<Calculator />', () => {
  let renderComponent;
  let onClick;
  let onCal;
  beforeEach(() => {
    const value = ['AC', '='];
    // const dispatch = jest.fn();
    onClick = jest.fn();
    onCal = jest.fn();
    // onCalculate: value => dispatch(evaluatePostFix(value))
    renderComponent = mount(
      <Calculator
        expression={fromJS(value)}
        onChangeExpression={onClick}
        // onChangeExpression={exp => dispatch(changeExpression(exp))}
        // onCalculate={arr => dispatch(evaluatePostFix(arr))}
        onCalculate={onCal}
      />,
    );
  });
  it('Should be run to case "AC"', () => {
    // console.log('renderComponent: ', renderComponent.debug());
    const button = renderComponent.find('button').at(0);
    const evt = { target: { className: 'item', innerText: 'AC' } };
    // get event will be occured
    button.prop('onClick')(evt);
    const expectedResult = ['AC'];
    // onChangeExpression be called with param: expectedResult
    expect(onClick).toBeCalledWith(expectedResult);
    // onChangeExpression
  });

  it('Should be run to case "="', () => {
    // console.log('renderComponent: ', renderComponent.debug());
    const button = renderComponent.find('button').at(0);
    const evt = { target: { className: 'item', innerText: '=' } };
    // get event will be occured
    button.prop('onClick')(evt);
    const expectedResult = ['AC', '='];
    expect(onCal).toBeCalledWith(expectedResult);
  });

  it('Should be run to case default', () => {
    // console.log('renderComponent: ', renderComponent.debug());
    const button = renderComponent.find('button').at(0);
    const evt = { target: { className: 'item', innerText: ')' } };
    // get event will be occured
    button.prop('onClick')(evt);
    const expectedResult = ['AC', '=', ')'];
    expect(onClick).toBeCalledWith(expectedResult);
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeExpression', () => {
      it('Should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        // Ensure that a variable is not undefined.
        expect(result.onChangeExpression).toBeDefined();
      });

      it('Should dispatch onChangeExpression when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const newSate = ['AC'];
        // result.onChangeUsername({ target: { value: username } });
        result.onChangeExpression(newSate);
        expect(dispatch).toHaveBeenCalledWith(changeExpression(newSate));
      });
    });

    describe('onCount', () => {
      it('Should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        // Ensure that a variable is not undefined.
        expect(result.onCount).toBeDefined();
      });

      it('Should dispatch onCount when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onCount();
        expect(dispatch).toHaveBeenCalledWith(count());
      });
    });

    describe('onCalculate', () => {
      it('Should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        // Ensure that a variable is not undefined.
        expect(result.onCalculate).toBeDefined();
      });

      it('Should dispatch onCount when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const value = ['2', '+', '3'];
        result.onCalculate(value);
        expect(dispatch).toHaveBeenCalledWith(evaluatePostFix(value));
      });
    });
  });
});
