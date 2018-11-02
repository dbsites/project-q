import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import FormContainer from './client/containers/FormContainer';
import TermsContainer from './client/containers/TermsContainer';
import App from './client/App';

// Root pulls store out of params to pass to Redux Provider
// Wrap React Router in Redux Provider and nest App in '/' path with optional 'filter' param
const Root = (props: any) => (
  <Provider store={props.store} >
    <Router>
        <div>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/account/login'>LOGIN</Link></li>
            <li><Link to='/account/register'>REGISTER</Link></li>
            <li><Link to='/terms/service'>TERMS OF SERVICE</Link></li>
            <li><Link to='/terms/privacy'>PRIVACY POLICY</Link></li>
          </ul>
          <Route exact path='/' component={App} />
          <Route exact path='/account/:id' component={FormContainer} />
          <Route exact path='/terms/:id' component={TermsContainer} />
        </div>
      </Router>
  </Provider >
);

export default Root;
