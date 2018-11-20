/**
 * @module Loading.tsx
 * @description Placeholder Loading Component
 * UNIT TEST COVERAGE - 100%
 */

import * as React from 'react';
import './Loading.scss';

interface LoadingProps {
  loadingMessage?: string,
}

const Loading = (props: LoadingProps): JSX.Element => {
  const loadingMessage = props.loadingMessage ? props.loadingMessage : 'Loading';
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
    <h1>{loadingMessage}</h1>
  </div>
  )
};

export default Loading;
