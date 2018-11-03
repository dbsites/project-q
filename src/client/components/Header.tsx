/**
 * @module Header.tsx
 * @description Application Header
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <ul className="header">
        <li className="header-left"><Link to='/'>ETHIQ</Link></li>
        <li className="header-right"><Link to='/account/register'>REGISTER</Link></li>
        <li className="header-right"><Link to='/account/login'>LOGIN</Link></li>
      </ul>
    </div>
  );
};

export default Header;
