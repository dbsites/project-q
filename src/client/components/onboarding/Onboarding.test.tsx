import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import Onboarding from './Onboarding';
import Button from '../Button';

Enzyme.configure({ adapter: new Adapter() });

const mockFn = jest.fn();

describe('Onboarding Component', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(<Onboarding updateIssuesSelected={mockFn} />).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <div> with class onboarding', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Onboarding updateIssuesSelected={mockFn} />);
    expect(onboardingWrapper.hasClass('onboarding')).toEqual(true);
    expect(onboardingWrapper.type()).toEqual('div');
  })
  it('contains 3 <div>s with class onboarding-step', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Onboarding updateIssuesSelected={mockFn} />);
    const onboardingStep = onboardingWrapper.find('.onboarding-step');
    expect(onboardingStep).toHaveLength(3);
    expect(onboardingStep.first().type()).toEqual('div');
  })
  it('contains 3 <div>s with class onboarding-step-text', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Onboarding updateIssuesSelected={mockFn} />);
    const onboardingStepText = onboardingWrapper.find('.onboarding-step-text');
    expect(onboardingStepText).toHaveLength(3);
    expect(onboardingStepText.first().type()).toEqual('div');
  })
  it('contains 3 <div>s with class onboarding-step-icons', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Onboarding updateIssuesSelected={mockFn} />);
    const onboardingIcons = onboardingWrapper.find('.onboarding-step-icons');
    expect(onboardingIcons).toHaveLength(3);
    expect(onboardingIcons.first().type()).toEqual('div');
  })
  it('AND contains 5 <img>s with class onboarding-icons-img', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Onboarding updateIssuesSelected={mockFn} />);
    const onboardingIcon = onboardingWrapper.find('.onboarding-icons-img');
    expect(onboardingIcon).toHaveLength(5);
    expect(onboardingIcon.first().type()).toEqual('img');
  })
  it('contains a <Button> with text "Begin"', () => {
    const onboardingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Onboarding updateIssuesSelected={mockFn} />);
    const onboardingButton = onboardingWrapper.find(Button);
    expect(onboardingButton).toHaveLength(1);
    expect(onboardingButton.props().children).toEqual('BEGIN');
  })
});
