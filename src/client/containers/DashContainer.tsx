/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';
import QuadsContainer from './QuadsContainer';

// Import selector functions
import { getIssueCount } from '../reducers/userReducer';
// import { submitSurvey } from '../actions/actionCreators';

const DashContainer = (props: any): any => {
  const {
    issues, issuesComplete, selectedIssues, survey, surveyPage, userId,
    submitSurvey
  } = props.userState;
  // CHeck if issues have already been selected - if not, serve IssuesContainer
  if (!issuesComplete) return <IssuesContainer />

  // Helper function to check if any issues are outstanding (value is null)
  // const countOutstandingIssues = (): number => {
  //   const outstandingIssuesArray = Object.keys(issues).filter((issue) => issues[issue] === null)
  //   return outstandingIssuesArray.length;
  // }

  const issueCount: number = getIssueCount(selectedIssues);

  if (surveyPage !== issueCount) return <SurveyContainer />

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
      surveyObj.questions[questionId].agree = survey[issueId][questionId].agree;
    });
  });

  submitSurvey(surveyObj);

  return <QuadsContainer />
};

export default DashContainer;
