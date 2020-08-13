import React from 'react';
import { shallow } from 'enzyme';
import Tab from './Tab';

describe('<Tab />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Tab title='test' active={true} click={() => jest.fn()} />
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
