import React from 'react';
import { shallow } from 'enzyme';
import Tab from './Tab';

describe('<Tab />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Tab />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
