/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';
import { submitSurvey } from '../actions/actionCreators';

const DashContainer = (props: any): any => {
  const { issues, survey, userId } = props.userState;
  // CHeck if issues have already been selected - if not, serve IssuesContainer
  if (!Object.keys(issues).length) return <IssuesContainer />

  // Helper function to check if any issues are outstanding (value is null)
  const countOutstandingIssues = (): number => {
    const outstandingIssuesArray = Object.keys(issues).filter((issue) => issues[issue] === null)
    return outstandingIssuesArray.length;
  }

  if (countOutstandingIssues()) return <SurveyContainer />

  // If no outstanding issues, console.log props
  const surveyObj: any = {
    userId: userId,
    issues: issues,
    questions: {},
  };
  
  const issueIdArray = Object.keys(survey);
  issueIdArray.forEach((issueId) => {
    const questionIdArray = Object.keys(survey[issueId]);
    questionIdArray.forEach((questionId) => {
      surveyObj.questions[questionId] = {};
      surveyObj.questions[questionId].issueId = issueId;
      surveyObj.questions[questionId].position = survey[issueId][questionId].position;
    });
  });

  submitSurvey(surveyObj);

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  )
};

export default DashContainer;
