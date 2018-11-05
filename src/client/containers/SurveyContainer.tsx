/**
 * @module SurveyContainer.tsx
 * @description Survey Question Container - User Onboarding
 */

import * as React from 'react';
import { connect } from 'react-redux';

import { getQuestionsList, getQuestionsObject } from '../reducers/surveyReducer';

import SurveyQuestion from '../components/SurveyQuestion';

import * as actions from '../actions/actionCreators';
import { getOutstandingIssues } from '../reducers/userReducer';


let surveyArray: any[] = [];

const SurveyContainer = (props: any): any => {
  const { answerQuestion, updateIssue, selectedIssues, survey } = props;

  let currentIssue;

  const selectedIssuesArray = Object.keys(selectedIssues)

  let issueIndex: number = 0;

  // Helper Function to populate survey
  const populateSurvey = (currentIssue: string): any => {
    // User function selecter to get survey questions from store
    const questionsList: any = getQuestionsList(survey, currentIssue);
    const questionsObject: any = getQuestionsObject(survey, currentIssue);
    
    // For each question, push a SurveyQuestion componenet into surveyArray
    surveyArray = [];
    const answers: any = {
      count: 0,
      agree: 0,
      disagree: 0,
    };
    questionsList.forEach((question: string, index: number) => {
      const questionAnswer = questionsObject[question].answer;
      if (questionAnswer) {
        answers.count += 1;
        answers[questionAnswer] += 1;
      }
      return surveyArray.push(
        <SurveyQuestion
          answerQuestion={answerQuestion}
          issue={currentIssue}
          question={question}
          questionAnswer={questionAnswer}
          questionNumber={index + 1}
          questionText={questionsObject[question].question}
        />,
      );
    });
    // Check if all three questions already answered
    if (answers.count === 3) {
      const answer = (answers.agree > answers.disagree) ? 'agree' : 'disagree';
      updateIssue({
        issue: currentIssue,
        answer: answer,
      })
    }
  }

  while (issueIndex < selectedIssuesArray.length) {
    currentIssue = selectedIssuesArray[issueIndex];
    if (!selectedIssues[currentIssue]) {
      populateSurvey(currentIssue);
      break;
    }
    issueIndex += 1;
  }

  // If no outstanding issues, complete survey
  if (!getOutstandingIssues(selectedIssues).length) return 

  const headerText: string = `What is your perspective on ${currentIssue}`;

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

const mapDispatchToProps = (dispatch: any): any => ({
  answerQuestion: (event: any) => dispatch(actions.answerQuestion(event)),
  updateIssue: (issue: any) => dispatch(actions.updateIssue(issue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
