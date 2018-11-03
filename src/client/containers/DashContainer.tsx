/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';

const DashContainer = (props: any): any => {
  const { issuesComplete, surveyComplete } = props.userState;

  if (!issuesComplete) return <IssuesContainer />

  if (!surveyComplete) return <SurveyContainer />

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  )
};

export default DashContainer;
