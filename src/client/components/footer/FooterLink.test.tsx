import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import FooterLink, { FooterLinkProps } from './FooterLink';
import { MemoryRouter } from 'react-router';
import { footerLinkData } from './Footer';
import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

const props: FooterLinkProps = {
  linkKey: footerLinkData[0][0],
  link: footerLinkData[0][1],
  text: footerLinkData[0][2],
}

describe('FooterLink Component', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(
      <MemoryRouter>
        <FooterLink {...props} />
      </MemoryRouter>
    ).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <li> with key equal to linkKey prop', () => {
    const footerLinkWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<FooterLink {...props} />)
    expect(footerLinkWrapper.type()).toEqual('li');
    expect(footerLinkWrapper.key()).toEqual(props.linkKey);
  })
  it('contains a Link to the link prop with text equal to the text prop', () => {
    const footerLinkWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<FooterLink {...props} />)
    expect(footerLinkWrapper.find(Link)).toHaveLength(1);
    expect(footerLinkWrapper.find(Link).props()).toHaveProperty('children', props.text)
    expect(footerLinkWrapper.find(Link).props()).toHaveProperty('to', props.link)
  })
});
