/**
 * @module Loading.tsx
 * @description Placeholder Loading Component
 * UNIT TEST COVERAGE - 100%
 */

import * as React from 'react';
import './Loading.scss';

const Loading = (): JSX.Element => {
  return (
    <div className="loading-container">
      <div className="loading">
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__ball"></div>
    </div>
    <h1>Loading</h1>
  </div>
  )
};

export default Loading;
