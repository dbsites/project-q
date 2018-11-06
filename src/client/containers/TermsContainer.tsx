/**
 * @module TermsContainer.tsx
 * @description Terms of Service Container
 */

import * as React from 'react';

const TermsContainer = ({ match }: any) => (
  <div>
    {match.params.id === 'service' ?
      (
        <h1>Terms of Service</h1>
      )
      :
      (
        <h1>Privacy Policy</h1>
      )
    }
  </div>
);

export default TermsContainer;
