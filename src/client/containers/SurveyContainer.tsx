/**
 * @module SurveyContainer.tsx
 * @description Survey Question Container - User Onboarding
 */

import * as React from 'react';
import { connect } from 'react-redux';

// Import Actions
import * as actions from '../actions/actionCreators';

// Import Selector Functions
import { getQuestionIdList, getQuestionsObject, getOutstandingQuestionsCount, getPosition } from '../reducers/surveyReducer';
import { getIssueName } from '../reducers/issuesReducer';

// Import Componenets
import SurveyPage from '../components/SurveyPage';
import SurveyQuestion from '../components/SurveyQuestion';

// Import Types
import { IssueQuestionsState, SurveyState } from '../reducers/types';
import ProgressBar from '../components/ProgressBar';

const SurveyContainer = (props: any): any => {
  const {
    answerQuestion, clearQuestions, updateIssue, updateIssuesSelected, prevPage,  // Actions
    issues, selectedIssues, survey, surveyPage,                                   // State
  } = props;

  // Initialize array to hold user's selected issues
  const selectedIssuesArray: string[] = Object.keys(selectedIssues)
  const issuesCount: number = selectedIssuesArray.length;
  let currentIssueId: string = selectedIssuesArray[surveyPage];

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

  // Populate survey with current issue id
  populateSurvey(currentIssueId);

  // Helper function to update Issues if user clicks "Next Issue"
  const callUpdateIssue = () => {
    const position = getPosition(survey, currentIssueId);
    return updateIssue({
      issue: currentIssueId,
      position: position,
    })
  }

  const headerText: string = getIssueName(issues, currentIssueId);

  // Helper function that generates active or inactive footer buttons
  const generateFooterBar = (issueId: string) => {
    if (getOutstandingQuestionsCount(survey, issueId) === 3) {
      // If no questions answered, return invalid button and progress bar
      return (
        <React.Fragment>
          <div className="dashboard-footer-button invalid" >
            Clear
          </div>
          <ProgressBar
            surveyPage={surveyPage}
            issuesCount={issuesCount}
          />
        </React.Fragment>
      )
    }
    // If questions answered, return clear button and progress bar
    return (
      <React.Fragment>
        <div className="dashboard-footer-button" onClick={() => clearQuestions(issueId)}>
          Clear
        </div>
        <ProgressBar
          surveyPage={surveyPage}
          issuesCount={issuesCount}
        />
      </React.Fragment>
    )
  }

  // Helper function that generates left buttons
  const generateLeftButton = () => {
    if (!surveyPage) {
      return (
        <div className="dashboard-side-button" onClick={updateIssuesSelected}>
          {"< Back"}
        </div>
      )
    }
    return (
      <div className="dashboard-side-button" onClick={prevPage}>
        {"< Back"}
      </div>
    )
  }

  // Helper function that generates left buttons
  const generateRightButton = (issueId: string) => {
    // If there are outstanding questions, return invalid button
    if (getOutstandingQuestionsCount(survey, issueId)) {
      // If 1 or 2 questions answered, return clear button only
      return (
        <div className="dashboard-side-button invalid" >
          {"Next >"}
        </div>
      )
    }
    return (
      // If all 3 questions answered (0 outstanding questions) return active clear and submit buttons
      <div className="dashboard-side-button" onClick={() => callUpdateIssue()}>
        {"Next >"}
      </div>
    )
  }

  const footerBar = generateFooterBar(currentIssueId);
  const leftButton = generateLeftButton();
  const rightButton = generateRightButton(currentIssueId);

  return (
    <SurveyPage
      headerText={headerText}
      surveyArray={surveyArray}
      leftButton={leftButton}
      rightButton={rightButton}
      footerBar={footerBar}
    />
  )
};

const mapStateToProps = (store: any): any => ({
  issues: store.issues,
  selectedIssues: store.user.issues,
  survey: store.survey,
  surveyPage: store.user.surveyPage,
});

const mapDispatchToProps = (dispatch: any): any => ({
  answerQuestion: (event: any) => dispatch(actions.answerQuestion(event)),
  clearQuestions: (issueId: string) => dispatch(actions.clearQuestions(issueId)),
  prevPage: () => dispatch(actions.prevPage()),
  submitSurvey: (surveyObj: SurveyState) => dispatch(actions.submitSurvey(surveyObj)),
  updateIssue: (issue: any) => dispatch(actions.updateIssue(issue)),
  updateIssuesSelected: () => dispatch(actions.updateIssuesSelected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
