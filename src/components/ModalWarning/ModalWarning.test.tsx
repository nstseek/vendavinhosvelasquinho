import React from 'react';
import { shallow } from 'enzyme';
import ModalWarning from './ModalWarning';

describe('<ModalWarning />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ModalWarning
        warning={{ text: 'test', title: 'test', open: true }}
        clearWarning={jest.fn}
        closeWarning={jest.fn}
      />
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
