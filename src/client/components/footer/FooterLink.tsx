/**
 * @module Footer.tsx
 * @description Application Footer Link Presentation Component
 * UNIT TEST COVERAGE - 100%
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

export interface FooterLinkProps {
  linkKey: string,
  link: string,
  text: string,
}

const FooterLink = (props: FooterLinkProps): JSX.Element => {
  const { linkKey, link, text } = props;
  return (
    <li key={linkKey}><Link to={link}>{text}</Link></li>
  )
}

export default FooterLink;
