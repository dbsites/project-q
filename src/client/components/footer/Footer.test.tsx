import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import Disclaimer from './Disclaimer'
import Footer from './Footer';
import FooterLink from './FooterLink';
import { MemoryRouter } from 'react-router';

Enzyme.configure({ adapter: new Adapter() });

describe('Footer Component: ', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    ).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <div> with class "footer"', () => {
    const footerWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Footer />);
    expect(footerWrapper.hasClass('footer')).toEqual(true);
    expect(footerWrapper.type()).toEqual('div');
  })
  it('contains one <ul> with class "footer-links" and one <Disclaimer>', () => {
    const footerWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Footer />);
    expect(footerWrapper.find('ul')).toHaveLength(1);
    expect(footerWrapper.find('ul').hasClass('footer-links')).toEqual(true);
    expect(footerWrapper.find('ul')).toHaveLength(1);
    expect(footerWrapper.find(Disclaimer)).toHaveLength(1);
  })
  it('contains one <ul> with class "footer-links" and one <Disclaimer>', () => {
    const footerWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Footer />);
    expect(footerWrapper.find('ul')).toHaveLength(1);
    expect(footerWrapper.find('ul').hasClass('footer-links')).toEqual(true);
    expect(footerWrapper.find('ul')).toHaveLength(1);
    expect(footerWrapper.find(Disclaimer)).toHaveLength(1);
  })
  it('ul contains three <FooterLink> componenets', () => {
    const footerWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Footer />);
    expect(footerWrapper.find('ul').find(FooterLink)).toHaveLength(3);
  })
});
