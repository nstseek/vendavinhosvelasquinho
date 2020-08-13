import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Backdrop show={true} />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
