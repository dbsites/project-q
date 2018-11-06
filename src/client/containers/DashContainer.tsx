/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';

const DashContainer = (props: any): any => {
  const { issues, surveyComplete } = props.userState;

  if (!Object.keys(issues).length) return <IssuesContainer />

  if (!surveyComplete) return <SurveyContainer />

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  )
};

export default DashContainer;
