import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Renderer from 'react-test-renderer';

import Loading from './Loading';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading Component: ', () => {
  it('matches the snapshot', () => {
    const tree = Renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('renders a <div> with class .loading-container', () => {
    const loadingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading />);
    expect(loadingWrapper.type()).toEqual('div');
    expect(loadingWrapper.hasClass('loading-container')).toEqual(true);
  })
  it('contains a <div> with class .loading and an h1', () => {
    const loadingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading />);
    const loadingDiv: Enzyme.ShallowWrapper = loadingWrapper.find('.loading');
    const loadingH1: Enzyme.ShallowWrapper = loadingWrapper.find('h1');
    expect(loadingDiv).toHaveLength(1);
    expect(loadingDiv.type()).toEqual('div');
    expect(loadingH1).toHaveLength(1);
  })
  it('the loadingContainer contains 5 loading bars <div>s and a loading ball <div>', () => {
    const loadingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading />);
    const loadingContainer: Enzyme.ShallowWrapper = loadingWrapper.find('.loading-container');
    expect(loadingContainer.find('.loading__bar')).toHaveLength(5);
    expect(loadingContainer.find('.loading__bar').first().type()).toEqual('div');
    expect(loadingContainer.find('.loading__ball')).toHaveLength(1);
    expect(loadingContainer.find('.loading__ball').type()).toEqual('div');
  })
  it('the H1 has text "Loading" by default', () => {
    const loadingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading />);
    const loadingH1Text: string = loadingWrapper.find('h1').text();
    expect(loadingH1Text).toEqual('Loading');
  })
  it('the H1 has text takes whatever text is passed in the loadingMessage prop ', () => {
    const loadingWrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading loadingMessage="Calculating" />);
    const loadingH1Text: string = loadingWrapper.find('h1').text();
    expect(loadingH1Text).toEqual('Calculating');
  })
});