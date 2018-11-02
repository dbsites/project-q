/**
 * @module App.tsx
 * @description App Container
 */


import * as React from 'react';
import { Link } from 'react-router-dom';

const App = (): any => (
  <div>
    <h1>Welcome to EthiQ</h1>
    <ul>
      <li>
        <Link to='/account/login'>Log In</Link>
      </li>
      <li>
        <Link to='/account/register'>Register</Link>
      </li>
    </ul>
  </div>
);

export default App;
