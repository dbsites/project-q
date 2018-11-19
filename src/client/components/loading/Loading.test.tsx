import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as renderer from 'react-test-renderer';

import Loading from './Loading';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading Component: ', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('renders a loading container and an h1', () => {
    const wrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading />);
    const loadingContainer: Enzyme.ShallowWrapper = wrapper.find('.loader-container');
    const loadingH1: Enzyme.ShallowWrapper = wrapper.find('h1');
    expect(loadingContainer).toHaveLength(1);
    expect(loadingH1).toHaveLength(1);
  })
  it('the loadingContainer contains 5 loading bars and a loading ball', () => {
    const wrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading />);
    const loadingContainer: Enzyme.ShallowWrapper = wrapper.find('.loader-container');
    expect(loadingContainer.find('.loader__bar')).toHaveLength(5);
    expect(loadingContainer.find('.loader__ball')).toHaveLength(1);
  })
  it('the H1 has text "Loading"', () => {
    const wrapper: Enzyme.ShallowWrapper = Enzyme.shallow(<Loading />);
    const loadingH1Text: string = wrapper.find('h1').text();
    expect(loadingH1Text).toEqual('Loading');
  })
});