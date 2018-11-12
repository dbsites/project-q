/**
 * @module TermsContainer.tsx
 * @description Terms of Service Container
 */

import * as React from 'react';
import TermsOfService from '../components/TermsOfService';
import PrivacyPolicy from '../components/PrivacyPolicy';
import FAQ from '../components/FAQ';

const TermsContainer = ({ match }: any) => {
  let termsDisplay: JSX.Element;
  const { id } = match.params;
  switch (id) {
    case 'service':
      termsDisplay = <TermsOfService />
      break;
    case 'privacy':
      termsDisplay = <PrivacyPolicy />
      break;
    default:
      termsDisplay = <FAQ />
      break;
  }
  return (
    <div className="main-container">
      {termsDisplay}
    </div>
  );
};

export default TermsContainer;
