/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from './SurveyContainer';
import QuadsContainer from './QuadsContainer';
import Loading from '../components/Loading';

const DashContainer = (props: any): any => {
  const {
    issues, issuesComplete, loading, survey, surveyComplete, userId,
    fetchIssues, submitSurvey
  } = props.userState;

  // Check if issues and survey are already complete
  if (!issuesComplete || !surveyComplete) {
    if (!Object.keys(issues).length || loading.issuesLoading) {
      if (!loading.issuesLoading) fetchIssues();
      return <Loading />
    };
    return issuesComplete ? <SurveyContainer /> : <IssuesContainer />;
  } 

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
