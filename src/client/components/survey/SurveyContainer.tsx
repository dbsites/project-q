/**
 * @module SurveyContainer.tsx
 * @description Survey Question Container - User Onboarding
 */

import './Survey.css';

import * as React from 'react';
import { connect } from 'react-redux';

// Import Actions
import * as actions from '../../actions/actionCreators';

// Import Selector Functions
import { getQuestionIdList, getQuestionsObject, getOutstandingQuestionsCount, getUnclickedQuestionsCount, getPosition, getQuestionsList } from '../../reducers/surveyReducer';
import { getIssueName } from '../../reducers/issuesReducer';

// Import Componenets
import SurveyPage from './SurveyPage';
import SurveyQuestion from './SurveyQuestion';

// Import Types
import { IssueQuestionsState, SurveyState } from '../../reducers/types';
import ProgressBar from './ProgressBar';
import { AGREE, DISAGREE, /* UNCLIKED, */ UNSURE } from '../survey/SurveyButtons';

const ANSWERS_COUNT = 3;

const SurveyContainer = (props: any): any => {
  const {
    answerQuestion, submitSurvey, updateIssuePosition, updateIssuesSelected, prevPage,  // Actions
    issues, survey, user,                                                               // State
  } = props;

  const { issuesSelected, surveyPage, userId } = user;
  
  // Initialize array to hold user's selected issues
  const issuesSelectedArray: string[] = Object.keys(issuesSelected)
  const issuesCount: number = issuesSelectedArray.length;
  let currentIssueId: string = issuesSelectedArray[surveyPage];

  // Initialize survey array to hold survey questions
  let surveyArray: JSX.Element[] = [];

  // Generate progress bar
  const footerBar = <ProgressBar surveyPage={surveyPage} issuesCount={issuesCount} />

  // Short-circuit process if survey complete
  if (surveyPage === issuesCount) {
    // Assemble survey object
    const surveyObj = {
      issues: issuesSelected,
      userId: userId,
      questions: getQuestionsList(survey),
    };
    submitSurvey(surveyObj);

    return (
      <SurveyPage
        complete={true}
        footerBar={footerBar}
      />
    )
  }
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
          questionText={questionsObject[questionId].questionText}
        />,
      );
    });
  };

  // Populate survey with current issue id
  populateSurvey(currentIssueId);

  // Helper function to update Issues if user clicks "Next Issue"
  const callUpdateIssue = () => {
    // deep copy of object
    const newSurvey = JSON.parse(JSON.stringify(survey));
    const unsureAnswersCount = getOutstandingQuestionsCount(newSurvey, currentIssueId);

    // if all 3 answers are 'unsure' - STOP and show alert
    if(unsureAnswersCount === ANSWERS_COUNT) {
      alert('you must answer "Agree" or "Disagree" to at least one of the 3 questions');
      return;
    }

    // if has at least 1 'unsure' answer
    if(unsureAnswersCount !== 0){
      const agreeAnswersCount = Object
        .keys(newSurvey[currentIssueId])
        .filter(key => newSurvey[currentIssueId][key].agree === AGREE)
        .length;
      const disagreeAnswersCount = Object
        .keys(newSurvey[currentIssueId])
        .filter(key => newSurvey[currentIssueId][key].agree === DISAGREE)
        .length;

      // if agree answers more than disagree
      // set 'agree' value to all 'unsure'
      if(agreeAnswersCount > disagreeAnswersCount){
        Object.keys(newSurvey[currentIssueId]).forEach((key: any) => {
          if(newSurvey[currentIssueId][key].agree === UNSURE){
            newSurvey[currentIssueId][key].agree = AGREE;
            // emit users choise
            answerQuestion({
              agree: AGREE,
              issueId: currentIssueId,
              questionId: key,
            });
          }
        });
      }
      // if agree answers equals disagree
      // set RANDOM value to all 'unsure'
      else if(agreeAnswersCount === disagreeAnswersCount){
        Object.keys(newSurvey[currentIssueId]).forEach((key: any) => {
          if(newSurvey[currentIssueId][key].agree === UNSURE){
            const trueOrFalse = Math.random() >= 0.5;
            newSurvey[currentIssueId][key].agree = trueOrFalse;
            // emit users choise
            answerQuestion({
              agree: trueOrFalse,
              issueId: currentIssueId,
              questionId: key,
            });
          }
        });
      }
      // if agree answers less than disagree
      // set 'disagree' value to all 'unsure'
      else if(agreeAnswersCount < disagreeAnswersCount){
        Object.keys(newSurvey[currentIssueId]).forEach((key: any) => {
          if(newSurvey[currentIssueId][key].agree === UNSURE){
            newSurvey[currentIssueId][key].agree = DISAGREE;
            // emit users choise
            answerQuestion({
              agree: DISAGREE,
              issueId: currentIssueId,
              questionId: key,
            });
          }
        });
      }
    }

    const position = getPosition(newSurvey, currentIssueId);
    return updateIssuePosition(currentIssueId, position)
  }

  const headerText: string = getIssueName(issues, currentIssueId);

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

  // Helper function that generates right buttons
  const generateRightButton = () => {
    // if at least 1 button not clicked show nothing
    if(getUnclickedQuestionsCount(survey, currentIssueId)){
      return null;
    }
    return (
      <div
        className="dashboard-side-button"
        onClick={() => callUpdateIssue()}
      >
        {"Next >"}
      </div>
    )
  }

  const leftButton = generateLeftButton();
  const rightButton = generateRightButton();

  return (
    <SurveyPage
      complete={false}
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
  user: store.user,
  survey: store.survey,
});

const mapDispatchToProps = (dispatch: any): any => ({
  answerQuestion: (event: any) => dispatch(actions.answerQuestion(event)),
  prevPage: () => dispatch(actions.prevPage()),
  submitSurvey: (surveyObj: SurveyState) => dispatch(actions.submitSurvey(surveyObj)),
  updateIssuePosition: (issueId: string, position: string) => dispatch(actions.updateIssuePosition(issueId, position)),
  updateIssuesSelected: () => dispatch(actions.updateIssuesSelected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
