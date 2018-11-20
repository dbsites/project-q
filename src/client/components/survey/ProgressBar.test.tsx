import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import ProgressBar, { ProgressBarFill } from './ProgressBar';

Enzyme.configure({ adapter: new Adapter() });

// Declare constants for testing
const stubSurveyPage = 1;
const stubIssueCount = 4;
const stubPercentComplete = 40;

describe('Progress Bar Component: ', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(<ProgressBar surveyPage={stubSurveyPage} issuesCount={stubIssueCount}/>).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <div> with class "progress-bar-container"', () => {
    const progressBarWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<ProgressBar surveyPage={stubSurveyPage} issuesCount={stubIssueCount}/>);
    expect(progressBarWrapper.type()).toEqual('div');
    expect(progressBarWrapper.hasClass('progress-bar-container')).toEqual(true);
  })
  it('contains a <div> with class "progress-bar" which contains a ProgressBarFill with props', () => {
    const progressBarWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<ProgressBar surveyPage={stubSurveyPage} issuesCount={stubIssueCount}/>);
    expect(progressBarWrapper.find('.progress-bar')).toHaveLength(1);
    expect(progressBarWrapper.find('.progress-bar').type()).toEqual('div');
    expect(progressBarWrapper.find(ProgressBarFill)).toHaveLength(1);
    expect(progressBarWrapper.find(ProgressBarFill).props().percentComplete).toEqual(40);
  })
  it('AND ProgressBarFill has props equal to 100 * (surveyPage + 1 / issueCount + 1)', () => {
    const expectedPercentComplete = ((stubSurveyPage + 1)/(stubIssueCount + 1)) * 100;
    const progressBarWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<ProgressBar surveyPage={stubSurveyPage} issuesCount={stubIssueCount}/>);
    expect(progressBarWrapper.find(ProgressBarFill)).toHaveLength(1);
    expect(progressBarWrapper.find(ProgressBarFill).props().percentComplete).toEqual(expectedPercentComplete);
  })
});

describe('Progress Bar Fill Component: ', () => {
  it('matches the snapshot', () => {
    const tree: Renderer.ReactTestRendererJSON = Renderer.create(<ProgressBarFill percentComplete={stubPercentComplete} />).toJSON() as Renderer.ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
  })
  it('renders a <div> with class "progress-bar-fill"', () => {
    const progressBarWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<ProgressBarFill percentComplete={stubPercentComplete} />);
    expect(progressBarWrapper.type()).toEqual('div');
    expect(progressBarWrapper.hasClass('progress-bar-fill')).toEqual(true);
  })
  it('has width and text equal to percentComplete', () => {
    const progressBarWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<ProgressBarFill percentComplete={stubPercentComplete} />);
    expect(progressBarWrapper.text()).toEqual(`${stubPercentComplete}%`)
    expect(progressBarWrapper.prop('style')).toEqual({"width": `${stubPercentComplete}%`});
  })
});