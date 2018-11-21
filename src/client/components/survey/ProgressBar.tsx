/**
 * @module ProgressBar.tsx
 * @description Issue Selection and Survey Progress Bar.
 * Returns a bar with progress level determined by # of issues selected & answered
 */

import * as React from 'react';

interface ProgressBarProps {
  surveyPage: number,
  issuesCount: number,
}

interface progressBarFillProps {
  percentComplete: number,
}

const ProgressBarFill = (props: progressBarFillProps) => {
  const { percentComplete } = props;
  return (
    <div
      className="progress-bar-fill"
      style={{ width: `${percentComplete}%`}}
    >
      {percentComplete}%
    </div>
  )
}

// Accept Page Number and Issues Count
const ProgressBar = (props: ProgressBarProps) => {
  const { surveyPage, issuesCount } = props;

  // Helper function that returns a formatted whole percentage
  const percentComplete = Math.floor(((surveyPage + 1) / (issuesCount + 1)) * 100);
  

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <ProgressBarFill percentComplete={percentComplete}/>
      </div>
    </div>
  )
}

export default ProgressBar;

export { ProgressBarFill };
