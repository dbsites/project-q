import * as React from 'react';

const brandingLogo = require('../../assets/brandingLogo.png')
import './Mobile.css';

const Mobile = () => {
  return (
    <div className="mobile-takeover">
      <img alt="Welcome to eTrade powered by Ethiq" className="mobile-takeover-image" src={brandingLogo} />
      <div className="mobile-takeover-text">Ethiq Beta Is Currently Optimized For Desktop</div>
    </div>
  )
};

export default Mobile;
