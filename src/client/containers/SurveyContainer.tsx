/**
 * @module SurveyContainer.tsx
 * @description Survey Question Container - User Onboarding
 */

import * as React from 'react';
import { connect } from 'react-redux';

import { getQuestionIdList, getQuestionsObject, getOutstandingQuestionsCount, getPosition } from '../reducers/surveyReducer';

import SurveyQuestion from '../components/SurveyQuestion';

import * as actions from '../actions/actionCreators';
import { getOutstandingIssues } from '../reducers/userReducer';
import { IssueQuestionsState } from '../reducers/types';
import { getIssueName } from '../reducers/issuesReducer';
import SurveyPage from '../components/SurveyPage';

// interface SurveyContainerProps {
//   answerQuestion: any; //TODO:
//   updateIssue: any; //TODO:
//   selectedIssues: UserIssues;
//   survey: SurveyState;
// }

const SurveyContainer = (props: any): any => {
  const {
    answerQuestion, clearQuestions, updateIssue,
    issues, selectedIssues, survey
  } = props;
  
  // Initialize array to hold user's selected issues
  const selectedIssuesArray: string[] = Object.keys(selectedIssues)
  const selectedIssueCount: number = selectedIssuesArray.length;
  
  // Initialize index at 0 and identify currentIssue
  let issueIndex: number = 0;
  let currentIssueId: string = selectedIssuesArray[issueIndex];
  
  // Initialize survey array to hold survey questions
  let surveyArray: JSX.Element[] = [];

  // Helper Function to populate survey
  const populateSurvey = (issueId: string): any => {
    // User function selecter to get survey questions from store for a given issue
    const questionsIdList: string[] = getQuestionIdList(survey, issueId);
    const questionsObject: IssueQuestionsState = getQuestionsObject(survey, issueId);
        
    // For each question, push a SurveyQuestion component into surveyArray
    questionsIdList.forEach((questionId: string) => {
      const questionAgree = questionsObject[questionId].agree;
      return surveyArray.push(
        <SurveyQuestion
          answerQuestion={answerQuestion}
          issueId={currentIssueId}
          key={questionId}
          questionId={questionId}
          questionAgree={questionAgree}
          questionText={questionsObject[questionId].question}
        />,
      );
    });
  };

  // Assign currentIssue to next issue with value 'null' and call 'populateSurvey'
  while (issueIndex < selectedIssueCount) {
    currentIssueId = selectedIssuesArray[issueIndex];
    if (!selectedIssues[currentIssueId]) {
      populateSurvey(currentIssueId);
      break;
    }
    issueIndex += 1;
  }

  // Helper function to update Issues if user clicks "Next Issue"
  const callUpdateIssue = () => {
    const position = getPosition(survey, currentIssueId);
    return updateIssue({
      issue: currentIssueId,
      position: position,
    })
  }

  // If no outstanding issues, complete survey
  const outstandingIssueCount: number = getOutstandingIssues(selectedIssues).length
  if (!outstandingIssueCount) return

  const headerText: string = getIssueName(issues, currentIssueId);

  // Helper function that generates active or inactive footer buttons
  const generateFooterButtons = (issueId: string) => {
    if(getOutstandingQuestionsCount(survey, issueId) === 3) {
      // If no questions answered, return invalid buttons
      return (
        <React.Fragment>
          <div className="dashboard-footer-button invalid" >
            Clear
          </div>
          <div className="dashboard-footer-button invalid" >
            Next
          </div>
        </React.Fragment>
      )
    } else if (getOutstandingQuestionsCount(survey, issueId)) {
      // If 1 or 2 questions answered, return clear button only
      return (
        <React.Fragment>
          <div className="dashboard-footer-button" onClick={() => clearQuestions(issueId)}>
            Clear
          </div>
          <div className="dashboard-footer-button invalid" >
            Next
          </div>
        </React.Fragment>
      )
    } else if (outstandingIssueCount === 1) {
      return (
        // If all 3 questions answered (0 outstanding questions) return active clear and submit buttons
        <React.Fragment>
          <div className="dashboard-footer-button" onClick={() => clearQuestions(issueId)}>
            Clear
          </div>
          <div className="dashboard-footer-button" onClick={() => callUpdateIssue()}>
            Complete
          </div>
        </React.Fragment>
      )
    }
    return (
      // If all 3 questions answered (0 outstanding questions) return active clear and submit buttons
      <React.Fragment>
        <div className="dashboard-footer-button" onClick={() => clearQuestions(issueId)}>
          Clear
        </div>
        <div className="dashboard-footer-button" onClick={() => callUpdateIssue()}>
          Next
        </div>
      </React.Fragment>
    )
  }

  const footerButtons = generateFooterButtons(currentIssueId);
  
  return (
    <SurveyPage
      headerText={headerText}
      surveyArray={surveyArray}
      footerButtons={footerButtons}
    />
  )
};

const mapStateToProps = (store: any): any => ({
  issues: store.issues,
  selectedIssues: store.user.issues,
  survey: store.survey,
});

const mapDispatchToProps = (dispatch: any): any => ({
  answerQuestion: (event: any) => dispatch(actions.answerQuestion(event)),
  clearQuestions: (issueId: string) => dispatch(actions.clearQuestions(issueId)),
  updateIssue: (issue: any) => dispatch(actions.updateIssue(issue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
