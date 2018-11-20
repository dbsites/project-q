/**
 * @module Footer.tsx
 * @description Application Footer Presentation Component
 * UNIT TEST COVERAGE - 100%
 */

import * as React from 'react';
import Disclaimer from './Disclaimer';
import FooterLink from './FooterLink';

import './Footer.css';

// TODO: REFACTOR
const footerLinkArray: JSX.Element[] = [];
export const footerLinkData: string[][] = [
  ['privacy-policy', '/terms/privacy', 'PRIVACY POLICY'],
  ['terms-of-service', '/terms/service', 'TERMS AND CONDITIONS'],
  ['frequently-asked-questions', '/terms/faq', 'FAQ'],
];
footerLinkData.forEach(data => footerLinkArray.push(<FooterLink key={data[0]} linkKey={data[0]} link={data[1]} text={data[2]} />))

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-links">
        {footerLinkArray}
      </ul>
      <Disclaimer />
    </div>
  );
};

export default Footer;
