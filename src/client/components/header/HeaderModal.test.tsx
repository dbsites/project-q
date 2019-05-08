import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import HeaderModal from './HeaderModal';
import { headerLinkData } from './headerLinkData';

Enzyme.configure({ adapter: new Adapter() });

const onClick = jest.fn()

const props = {
  className: headerLinkData.login.className,
  linkKey: headerLinkData.login.linkKey,
  onClick: onClick,
}

describe('HeaderModal Component', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(
      <HeaderModal {...props}>{headerLinkData.login.linkText}</HeaderModal>
    ).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <li> with key equal to linkKey prop', () => {
    const headerModalWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<HeaderModal {...props}>{headerLinkData.login.linkText}</HeaderModal>)
    expect(headerModalWrapper.type()).toEqual('li');
    expect(headerModalWrapper.key()).toEqual(props.linkKey);
    expect(headerModalWrapper.find('li').text()).toEqual(headerLinkData.login.linkText);
  })
  it('contains an onClick property which is called upon click', () => {
    const headerModalWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<HeaderModal {...props}>{headerLinkData.login.linkText}</HeaderModal>)
    headerModalWrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  })
});
