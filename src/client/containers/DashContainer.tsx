/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';

const DashContainer = (props: any): any => {
  const { issues } = props.userState;
  // CHeck if issues have already been selected - if not, serve IssuesContainer
  if (!Object.keys(issues).length) return <IssuesContainer />

  // Helper function to check if any issues are outstanding (value is null)
  const countOutstandingIssues = (): number => {
    const outstandingIssuesArray = Object.keys(issues).filter((issue) => issues[issue] === null)
    return outstandingIssuesArray.length;
  }

  if (countOutstandingIssues()) return <SurveyContainer />

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  )
};

export default DashContainer;
