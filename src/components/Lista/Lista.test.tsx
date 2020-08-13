import React from 'react';
import { shallow } from 'enzyme';
import Lista from './Lista';

describe('<Lista />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Lista />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
