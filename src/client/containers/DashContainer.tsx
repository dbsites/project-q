/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';
import QuadsContainer from './QuadsContainer';

const DashContainer = (props: any): any => {
  const { issues, surveyComplete } = props.userState;

  if (!Object.keys(issues).length) return <IssuesContainer />

  if (!surveyComplete) return <SurveyContainer />

  return <QuadsContainer />
};

export default DashContainer;
