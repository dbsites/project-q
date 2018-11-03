import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './client/components/Header';
import Footer from './client/components/Footer';
import Disclaimer from './client/components/Disclaimer'

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
          <Route path='/' component={Header} />
          <Route exact path='/' component={App} />
          <Route exact path='/account/:id' component={FormContainer} />
          <Route exact path='/terms/:id' component={TermsContainer} />
          <Route path='/' component={Footer} />
          <Route path='/' component={Disclaimer} />
        </div>
      </Router>
  </Provider >
);

export default Root;
