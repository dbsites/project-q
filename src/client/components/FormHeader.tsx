/**
 * @module FormHeader.tsx
 * @description Application Header for Log In and Registration Form
 */

import * as React from 'react';
const eTradeLogo = require('../assets/eTrade.png')

const FormHeader = () => {
  return (
    <div className="form-header">
      <div className="form-header-welcome-text">WELCOME TO</div>
      <img alt="Welcome to eTrade powered by Ethiq" className="form-header-logo-image" src={eTradeLogo}  />
      <div className="form-header-hr"><hr /></div>
      <div className="form-header-tagline">LEARN WHICH COMPANIES ARE MOST ALIGNED WITH <em>YOU.</em></div>
    </div>
  );
};

export default FormHeader;
