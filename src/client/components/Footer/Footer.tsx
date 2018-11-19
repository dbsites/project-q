/**
 * @module Footer.tsx
 * @description Application Footer Presentation Component
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import Disclaimer from './Disclaimer';

import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-links">
        <li key="privacy-policy"><Link to='/terms/privacy'>PRIVACY POLICY</Link></li>
        <li key="terms-of-service"><Link to='/terms/service'>TERMS AND CONDITIONS</Link></li>
        <li key="frequently-asked-questions"><Link to='/terms/faq'>FAQ</Link></li>
      </ul>
      <Disclaimer />
    </div>
  );
};

export default Footer;
