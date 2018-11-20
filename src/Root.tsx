/**
 * @module Root.tsx
 * @description 
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './client/components/Footer/Footer';

import FormContainer from './client/containers/FormContainer';
import TermsContainer from './client/containers/TermsContainer';
import App from './client/App';

import './Root.css';

// Root pulls store out of params to pass to Redux Provider
// Wrap React Router in Redux Provider and nest App in '/' path with optional 'filter' param
const Root = (props: any) => (
  <Provider store={props.store} >
    <Router>
      <div className="screen">
        <Route exact path='/' component={App} />
        <Route exact path='/account/:form/:id?' component={FormContainer} />
        <Route exact path='/terms/:id' component={TermsContainer} />
        <Route path='/' component={Footer} />
      </div>
    </Router>
  </Provider >
);

export default Root;
