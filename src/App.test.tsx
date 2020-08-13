import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
