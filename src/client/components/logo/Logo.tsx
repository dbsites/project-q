/**
 * @module Logo.tsx
 * @description Branding Logo Component
 */

const brandingLogo = require('../../assets/brandingLogo.png')

import * as React from 'react';

interface LogoProps {
  className: string,
}

const Logo = (props: LogoProps) => {
  const caption = "Welcome to Ethiq";
  const { className } = props;
  return (
    <img alt={caption} className={className} src={brandingLogo} />
  )
};

export default Logo;

