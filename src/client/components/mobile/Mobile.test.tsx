import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import Mobile from './Mobile';

Enzyme.configure({ adapter: new Adapter() });

describe('Mobile Component', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(<Mobile />).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  });
  it('renders a <div> with class mobile-takeover', () => {
    const mobileWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Mobile />);
    expect(mobileWrapper.type()).toEqual('div');
    expect(mobileWrapper.hasClass('mobile-takeover')).toEqual(true);
  });
  it('contains 1 <img> with class mobile-takeover-image', () => {
    const mobileWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Mobile />);
    const mobileImg = mobileWrapper.find('.mobile-takeover-image');
    expect(mobileImg).toHaveLength(1);
    expect(mobileImg.type()).toEqual('img');
  });
  it('contains 1 <div> with class mobile-takeover-text with text "Ethiq Beta Is Currently Optimized For Desktop', () => {
    const mobileWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Mobile />);
    const mobileText = mobileWrapper.find('.mobile-takeover-text');
    expect(mobileText).toHaveLength(1);
    expect(mobileText.type()).toEqual('div');
    expect(mobileText.text()).toEqual('Ethiq Beta Is Currently Optimized For Desktop');
  });
});
