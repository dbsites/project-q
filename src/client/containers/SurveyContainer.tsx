/**
 * @module SurveyContainer.tsx
 * @description Survey Question Container - User Onboarding
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { getQuestionsList, getQuestionsObject } from '../reducers/surveyReducer';
import SurveyQuestion from '../components/SurveyQuestion';

const headerText: string = 'Welcome to the survey!'

const surveyArray: any = [];

const SurveyContainer = (props: any): any => {
  const { selectedIssues, survey } = props;

  const selectedIssuesArray = Object.keys(selectedIssues)

  let issueIndex: number = 0;

  // Helper Function to populate survey
  const populateSurvey = (currentIssue: string): any => {
    // User function selecter to get survey questions from store
    getQuestionsList
    const questionsList: any = getQuestionsList(survey, currentIssue);
    const questionsObject: any = getQuestionsObject(survey, currentIssue);
    
    // For each question, push a SurveyQuestion componenet into surveyArray
    questionsList.forEach((question: string) => {
      console.log(questionsObject[question]);
      return surveyArray.push(<SurveyQuestion
        questionText={questionsObject[question].question}
      />,
    )});
  }

  while (issueIndex < selectedIssuesArray.length) {
    const currentIssue = selectedIssuesArray[issueIndex];
    if (!selectedIssues[currentIssue]) {
      populateSurvey(currentIssue);
      break;
    }
    issueIndex += 1;
  }

  return (
    <div className="survey-dashboard">
      <div className="survey-dashboard-header">{headerText}</div>
      <div className="survey-dashboard-container">
        {surveyArray}
      </div>
    </div>
  )
};

const mapStateToProps = (store: any): any => ({
  selectedIssues: store.user.issues,
  survey: store.survey,
});

export default connect(mapStateToProps, null)(SurveyContainer);
