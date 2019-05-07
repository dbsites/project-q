import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import Logo from './Logo';

const brandingLogo = require('../assets/brandingLogo.png')

Enzyme.configure({ adapter: new Adapter() });

describe('Loading Component: ', () => {
  const stubClassName = 'logo-image';

  it('matches the snapshot', () => {
    const tree = Renderer.create(<Logo className={stubClassName} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders an <img> with class onboarding', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Logo className={stubClassName} />);
    expect(onboardingWrapper.hasClass(stubClassName)).toEqual(true);
    expect(onboardingWrapper.type()).toEqual('img');
  })

  it('renders an <img> with alt "Welcome to Ethiq" and src "brandinglogo.png"', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Logo className={stubClassName} />);
    expect(onboardingWrapper.prop('alt')).toEqual('Welcome to Ethiq');
    expect(onboardingWrapper.prop('src')).toEqual(brandingLogo);
  })
});
