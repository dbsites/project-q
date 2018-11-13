/**
 * @module surveyReducer
 * @description Reducer for Survey Object
 */

import actions from '../actions/actionTypes';
import { SurveyState, QuestionState, IssueQuestionsState } from './types';

// Define initial state
const initialSurveyState: SurveyState = {};

// Reducer for single question
const questionReducer = (state: QuestionState, action: any, issueId: string, questionId: string): QuestionState => {
  let nextState: QuestionState = {...state};
  switch(action.type) {
    case actions.ANSWER_QUESTION:
      if (state.questionId === action.payload.questionId) {
        return {
          ...state,
          agree: action.payload.agree,
        }
      }

    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      nextState = {
        ...nextState,
        ...action.response[issueId][questionId]
      };
      return nextState;
      
    case actions.FETCH_AUTH_SUCCESS:
    case actions.FETCH_FORM_SUCCESS:
      nextState = {
        ...nextState,
        ...action.response.questions[issueId][questionId]
      };
      return nextState;

    default: 
    return state
  }
}

// Reducer for all questions for a given issueId
const questionsReducer = (state: IssueQuestionsState, action: any, issueId: string): IssueQuestionsState => {
  const nextState: IssueQuestionsState = {...state};
  switch(action.type) {
    case actions.ANSWER_QUESTION:
      const questionId: string = action.payload.questionId;
      nextState[questionId] = questionReducer(state[questionId], action, issueId, questionId);
      return nextState;

    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      const questionsIdArray = Object.keys(action.response[issueId]);
      questionsIdArray.forEach((questionId) => {
        const questionState = state[questionId] ? {...state[questionId]} : {};
        nextState[questionId] = questionReducer(questionState as QuestionState, action, issueId, questionId)
      })
      return nextState;

    case actions.FETCH_AUTH_SUCCESS:
    case actions.FETCH_FORM_SUCCESS:
      const questionsIdArray2 = Object.keys(action.response.questions[issueId]);
      questionsIdArray2.forEach((questionId) => {
        const questionState = state[questionId] ? {...state[questionId]} : {};
        nextState[questionId] = questionReducer(questionState as QuestionState, action, issueId, questionId)
      })
      return nextState;

    default: 
    return state
  }
}

// Reducer for whole survey
const surveyReducer = (state: SurveyState = initialSurveyState, action: any): SurveyState => {
  const nextState: SurveyState = {...state};
  switch(action.type) {
    case actions.ANSWER_QUESTION:
      const issueId: string = action.payload.issueId;
      nextState[issueId] = questionsReducer(state[issueId], action, issueId)
      return nextState
    
    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      const issuesIdArray = Object.keys(action.response);
      issuesIdArray.forEach((issueId) => {
        const issueQuestionsState = state[issueId] ? {...state[issueId]} : {};
        nextState[issueId] = questionsReducer(issueQuestionsState, action, issueId);
      });
      return nextState;

      case actions.FETCH_AUTH_SUCCESS:
      case actions.FETCH_FORM_SUCCESS:
        if (action.response.questions) {
          const issuesIdArray = Object.keys(action.response.questions);
          console.log('issuesIdArray: ', issuesIdArray);
          issuesIdArray.forEach((issueId) => {
            const issueQuestionsState = state[issueId] ? {...state[issueId]} : {};
            nextState[issueId] = questionsReducer(issueQuestionsState, action, issueId);
          })
          return nextState;
        } else return state;

    default: 
    return state;
  }
}

export default surveyReducer;

// -- SELECTOR FUNCTIONS -- //
// Return all question IDs and agreement
export const getQuestionsList = (state: SurveyState): any => {
  const questionsList: any = {};
  for (let issueId in state) {
    for (let questionId in state[issueId]) {
      questionsList[questionId] = state[issueId][questionId].agree;
    }
  }
  return questionsList;
}
// Return survey question IDs
export const getQuestionIdList = (state: SurveyState, issueId: string): string[] => Object.keys(state[issueId]);
// Return survey questions object
export const getQuestionsObject = (state: SurveyState, issueId: string): IssueQuestionsState => state[issueId];
// Return count of questions whose answers are still null
export const getOutstandingQuestionsCount = (state: SurveyState, issueId: string): number => {
    const questionsObject = getQuestionsObject(state, issueId);
    let outstandingQuestions = Object.keys(questionsObject).filter(q => questionsObject[q].agree === null);
    return outstandingQuestions.length;
  };
// Return overall issue position once user has answered three survey questions
export const getPosition = (state: SurveyState, issueId: string): string => {
  let proScore: number = 0;
  const questionIdList = getQuestionIdList(state, issueId);
  const questionsObject = getQuestionsObject(state, issueId);
  questionIdList.forEach((questionId) => {
    if (questionsObject[questionId].agree && questionsObject[questionId].position === 'pro') proScore += 1;
    if (!questionsObject[questionId].agree && questionsObject[questionId].position === 'con') proScore += 1;
  })
  switch(proScore) {
    case 3:
      return 'strong pro';
    case 2:
      return 'pro';
    case 1:
      return 'con';
    default:
      return 'strong con';
  }
};
