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
import { IssueQuestionsState } from '../reducers/types';

// interface SurveyContainerProps {
//   answerQuestion: any; //TODO:
//   updateIssue: any; //TODO:
//   selectedIssues: UserIssues;
//   survey: SurveyState;
// }

const SurveyContainer = (props: any): any => {
  const {
    answerQuestion, updateIssue,
    selectedIssues, survey
  } = props;
  
  // Initialize array to hold user's selected issues
  const selectedIssuesArray: string[] = Object.keys(selectedIssues)
  const selectedIssueCount: number = selectedIssuesArray.length;
  
  // Initialize index at 0 and identify currentIssue
  let issueIndex: number = 0;
  let currentIssue: string = selectedIssuesArray[issueIndex];
  
  // Initialize survey array to hold survey questions
  let surveyArray: JSX.Element[] = [];

  // Helper Function to populate survey
  const populateSurvey = (issueId: string): any => {
    // User function selecter to get survey questions from store for a given issue
    const questionsList: string[] = getQuestionsList(survey, issueId);
    const questionsObject: IssueQuestionsState = getQuestionsObject(survey, issueId);

    // Initialize object to hold survey question answers
    interface answersObj {
      [index: string] : number
    }
    const answers: answersObj = {
      count: 0,
      agree: 0,
      disagree: 0,
    };
        
    // For each question, push a SurveyQuestion component into surveyArray
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

    // If all three questions answered, update issue in user object
    if (answers.count === 3) {
      let answer: string;
      switch(answers.agree) {
        case 3:
          answer = 'strongly agree';
          break;
        case 2:
          answer = 'agree';
          break;
        case 1:
          answer = 'disagree';
          break;
        default:
          answer = 'strongly disagree';
      }
      updateIssue({
        issue: currentIssue,
        answer: answer,
      })
    };
  };

  // Assign currentIssue to next issue with value 'null' and call 'populateSurvey'
  console.log('Issue Index: ', issueIndex);
  console.log('Selected Issue Count: ', selectedIssueCount);
  while (issueIndex < selectedIssueCount) {
    currentIssue = selectedIssuesArray[issueIndex];
    if (!selectedIssues[currentIssue]) {
      populateSurvey(currentIssue);
      break;
    }
    issueIndex += 1;
  }

  // If no outstanding issues, complete survey
  const outstandingIssueCount: number = getOutstandingIssues(selectedIssues).length
  if (!outstandingIssueCount) return 

  const headerText: string = `Survey Page ${selectedIssueCount - outstandingIssueCount + 1} of ${selectedIssueCount}: What is your perspective on ${currentIssue}`;

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
