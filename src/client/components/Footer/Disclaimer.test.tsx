import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import Disclaimer from './Disclaimer';

Enzyme.configure({ adapter: new Adapter() });

describe('Disclaimer Component: ', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(<Disclaimer />).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <div> with class disclaimer', () => {
    const disclaimerWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Disclaimer />);
    expect(disclaimerWrapper.hasClass('disclaimer')).toEqual(true);
    expect(disclaimerWrapper.type()).toEqual('div');
  })
  it('contains 1 <span> with class .disclaimer-text', () => {
    const disclaimerWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Disclaimer />);
    const disclaimerText = disclaimerWrapper.find('.disclaimer-text');
    expect(disclaimerText.type()).toEqual('span');
    expect(disclaimerText).toHaveLength(1);
  })
});
