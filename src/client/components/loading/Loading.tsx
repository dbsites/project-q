/**
 * @module Loading.tsx
 * @description Placeholder Loading Component
 */

import * as React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
    </div>
    <h1>Loading</h1>
  </div>
  )
};

export default Loading;
