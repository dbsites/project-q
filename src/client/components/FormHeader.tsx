/**
 * @module FormHeader.tsx
 * @description Application Header for Log In and Registration Form
 */

import * as React from 'react';
const brandingLogo = require('../assets/brandingLogo.png')

const FormHeader = () => {
  return (
    <div className="form-header">
      <div className="form-header-welcome-text">Welcome to</div>
      <img alt="Welcome to eTrade powered by Ethiq" className="form-header-logo-image" src={brandingLogo}  />
      <div className="form-header-hr"><hr /></div>
      <div className="form-header-tagline">Invest in companies aligned with <em>you.</em></div>
    </div>
  );
};

export default FormHeader;
