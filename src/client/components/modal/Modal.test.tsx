/**
 * @module Modal.test
 * @description Unit Tests for Modal React Container
 */

import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as Renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router';
import Modal from './Modal';
import ModalSpan from './ModalSpan';
import Button from '../Button';

Enzyme.configure({ adapter: new Adapter() });

// Declare constants and mocks for testing
const mockFn = jest.fn();

describe('Reset Modal Component', () => {
  it('matches the snapshot', () => {
    const tree = Renderer.create(
      <MemoryRouter>
        <Modal clearModal={mockFn} modalType='reset' />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders two divs - one with class "modal-opacity" and one with class "modal-outer"', () => {
    const shallowModalWrapper = Enzyme.shallow(<Modal clearModal={mockFn} modalType='reset' />);
    expect(shallowModalWrapper.find('.modal-opacity').type()).toEqual('div');
    expect(shallowModalWrapper.find('.modal-outer').type()).toEqual('div');
    expect(shallowModalWrapper.find('.modal-inner').type()).toEqual('div');
  });

  it('renders two <ModalSpan>s and two <Button>s inside modal-inner"', () => {
    const shallowModalWrapper = Enzyme.shallow(<Modal clearModal={mockFn} modalType='reset' />);
    expect(shallowModalWrapper.find('.modal-inner').find(ModalSpan)).toHaveLength(2);
    expect(shallowModalWrapper.find('.modal-inner').find(Button)).toHaveLength(2);
  });
});
