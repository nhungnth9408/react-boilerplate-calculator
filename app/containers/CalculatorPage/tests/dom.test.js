import React from 'react';
import { mount } from 'enzyme';
import { Calculator } from '../Calculator';
describe('<Calculator />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = mount(<Calculator expression={['AC', '=']} />);
  });
  it('', () => {
    // console.log('renderComponent: ', renderComponent.debug());

    const button = renderComponent.find('button').at(0);
    const evt = { target: { className: 'item', key: 'AC' } };
    // get event will be occured
    button.prop('onClick')(evt);
    // const expression = ['AC', '='];
    // expect(expression.pop()).toEqual(['AC']);
  });
});
