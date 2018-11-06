/**
 * @module TermsContainer.tsx
 * @description Terms of Service Container
 */

import * as React from 'react';
import TermsOfService from '../components/TermsOfService';
import PrivacyPolicy from '../components/PrivacyPolicy';

const TermsContainer = ({ match }: any) => (
  <div className="main-container">
    {match.params.id === 'service' ?
      (
        <div>
          <h1>Terms of Service</h1>
          <TermsOfService />
        </div>
      )
      :
      (
        <div>
          <h1>Privacy Policy</h1>
          <PrivacyPolicy />
        </div>
      )
    }
  </div>
);

export default TermsContainer;
