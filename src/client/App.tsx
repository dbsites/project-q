/**
 * @module App.tsx
 * @description Overarching App Container
 */


import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import FormContainer from './containers/FormContainer';
import TermsContainer from './containers/TermsContainer';

import Home from './components/Home'

class App extends React.Component {
  // TODO: Explicit type for props
  constructor(props: any) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isSignUpLoginToggled: false
    }
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/account/login'>LOGIN</Link></li>
            <li><Link to='/account/register'>REGISTER</Link></li>
            <li><Link to='/terms/service'>TERMS OF SERVICE</Link></li>
            <li><Link to='/terms/privacy'>PRIVACY POLICY</Link></li>
          </ul>
          <Route exact path='/' component={Home} />
          <Route exact path='/account/:id' component={FormContainer} />
          <Route exact path='/terms/:id' component={TermsContainer} />
        </div>
      </Router>
    );
  }
};

export default App;
