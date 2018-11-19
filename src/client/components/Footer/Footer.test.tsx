import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as renderer from 'react-test-renderer';

import Footer from './Footer';
import { MemoryRouter } from 'react-router';

Enzyme.configure({ adapter: new Adapter() });

describe('Disclaimer Component: ', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
