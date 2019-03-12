/**
 * @module HeaderLink.tsx
 * @description Application Header Link Presentation Component
 * UNIT TEST COVERAGE - 100%
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

export interface HeaderLinkProps {
  className: string,
  linkKey: string,
  linkRoute: string,
  children: string,
}

const HeaderLink = (props: HeaderLinkProps): JSX.Element => {
  const { className, linkKey, linkRoute, children } = props;
  return (
    <li className={className} key={linkKey}><Link to={linkRoute}>{children}</Link></li>
  )
}

export default HeaderLink;
