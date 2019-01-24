/**
 * @module HeaderLink.tsx
 * @description Application Header Link Presentation Component
 * UNIT TEST COVERAGE - 100%
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

export interface HeaderLinkProps {
  className: string,
  link: string,
  linkKey: string,
  linkText: string,
}

const HeaderLink = (props: HeaderLinkProps): JSX.Element => {
  const { className, linkKey, link, linkText } = props;
  return (
    <li className={className} key={linkKey}><Link to={link}>{linkText}</Link></li>
  )
}

export default HeaderLink;
