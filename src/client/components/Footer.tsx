/**
 * @module Footer.tsx
 * @description Application Footer Presentation Component
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <ul className="footer">
        <li><Link to='/terms/service'>TERMS OF SERVICE</Link></li>
        <li><Link to='/terms/privacy'>PRIVACY POLICY</Link></li>
      </ul>
    </div>
  );
};

export default Header;
