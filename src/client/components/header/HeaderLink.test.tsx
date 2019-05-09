import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import HeaderLink from './HeaderLink';
import { MemoryRouter } from 'react-router';
import { headerLinkData } from './headerLinkData';
import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  className: headerLinkData.login.className,
  linkKey: headerLinkData.login.linkKey,
  linkRoute: headerLinkData.login.linkRoute,
}

describe('HeaderLink Component', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(
      <MemoryRouter>
        <HeaderLink {...props} linkRoute={headerLinkData.login.linkRoute as string}>{headerLinkData.login.linkText}</HeaderLink>
      </MemoryRouter>
    ).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <li> with key equal to linkKey prop', () => {
    const headerLinkWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<HeaderLink {...props} linkRoute={headerLinkData.login.linkRoute as string}>{headerLinkData.login.linkText}</HeaderLink>)
    expect(headerLinkWrapper.type()).toEqual('li');
    expect(headerLinkWrapper.key()).toEqual(props.linkKey);
  })
  it('contains a Link to the link prop with text equal to the text prop', () => {
    const headerLinkWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<HeaderLink {...props} linkRoute={headerLinkData.login.linkRoute as string}>{headerLinkData.login.linkText}</HeaderLink>)
    expect(headerLinkWrapper.find(Link)).toHaveLength(1);
    expect(headerLinkWrapper.find(Link).props()).toHaveProperty('children', headerLinkData.login.linkText)
    expect(headerLinkWrapper.find(Link).props()).toHaveProperty('to', props.linkRoute)
  })
});
