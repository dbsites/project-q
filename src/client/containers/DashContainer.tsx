/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';

const DashContainer = (props: any): any => {
  const { issues } = props.userState;

  if (!Object.keys(issues).length) return <IssuesContainer />

  // Check issues outstanding
  let oustandingIssues: boolean = false;

  Object.keys(issues).forEach((issue) => {
    if (issues[issue] === null) {
      oustandingIssues = true;
    }
  });

  console.log('Dash Issues: ', issues);
  console.log('Outstanding Issues: ', oustandingIssues);

  if (oustandingIssues) return <SurveyContainer />

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  )
};

export default DashContainer;
