/**
 * @module ModalText.test
 * @description Unit Tests for Modal Text React Component
 */

import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as Renderer from 'react-test-renderer';

import ModalSpan from './ModalSpan';

Enzyme.configure({ adapter: new Adapter() });

// Declare constants for testing
const stubModalHeaderText = 'Reset Ethiq?';
const stubModalBodyText = 'Continue?';

describe('Modal Text Component: ', () => {
  it('matches the snapshot', () => {
    const tree = Renderer.create(<ModalSpan header={true}>{stubModalHeaderText}</ModalSpan>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('when header is true, renders a span with class "modal-header-text', () => {
    const shallowModalSpanWrapper = Enzyme.shallow(<ModalSpan header={true}>{stubModalHeaderText}</ModalSpan>);
    expect(shallowModalSpanWrapper.hasClass('modal-header-text')).toEqual(true);
    expect(shallowModalSpanWrapper.type()).toEqual('span');
  });

  it('when header is false, renders a span with class "modal-body-text', () => {
    const shallowModalSpanWrapper = Enzyme.shallow(<ModalSpan header={false}>{stubModalBodyText}</ModalSpan>);
    expect(shallowModalSpanWrapper.hasClass('modal-body-text')).toEqual(true);
    expect(shallowModalSpanWrapper.type()).toEqual('span');
  });

  it('renders the text passed in as children in the span', () => {
    const shallowModalHeaderSpanWrapper = Enzyme.shallow(<ModalSpan header={true}>{stubModalHeaderText}</ModalSpan>);
    expect(shallowModalHeaderSpanWrapper.text()).toEqual(stubModalHeaderText);
    const shallowModalBodySpanWrapper = Enzyme.shallow(<ModalSpan header={false}>{stubModalBodyText}</ModalSpan>);
    expect(shallowModalBodySpanWrapper.text()).toEqual(stubModalBodyText);
  });
});
