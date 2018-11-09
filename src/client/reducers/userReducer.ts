/**
 * @module userReducer
 * @description Reducer for User Object
 */

import actions from '../actions/actionTypes';
import { UserState, UserIssues } from './types';

// Define initial state
const initialUserState: UserState = {
  userId: null,
  isAuth: null,
  issues: {},
  issuesComplete: null,
  surveyComplete: null,
  surveyPage: 0,
};

const issueReducer = (state: UserIssues, action: any): UserIssues => {
  switch (action.type) {
    case actions.UPDATE_ISSUE_POSITION:
      const nextState: UserIssues = {};
      nextState[action.payload.issue] = action.payload.position;
      return {
        ...state,
        ...nextState
      }
    default:
      return state;

  }
}

const userReducer = (state: UserState = initialUserState, action: any): UserState => {
  switch (action.type) {
    case actions.AUTH_USER:
      if (action.payload === 'cookie not found') {
        return {
          ...state,
          isAuth: false,
        }
      }
      return {
        ...state,
        userId: action.payload,
        isAuth: true,
      }

    case actions.LOGOUT_USER:
      const cookies: string[] = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i += 1) {
        const cookie: string = cookies[i];
        const eqPos: number = cookie.indexOf('=');
        const name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      return {
        ...state,
        isAuth: false,
      }
    
    case actions.FETCH_FORM_SUCCESS:
    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      if (Object.keys(action.response.issues).length) {
        return {
          ...state,
          userId: action.response.userId,
          issues: action.response.issues,
          issuesComplete: true,
        }
      }
      return {
        ...state,
        issuesComplete: false,
      };

    case actions.FETCH_SUBMIT_SURVEY_SUCCESS:
      return {
        ...state,
        surveyComplete: true,
      };

    case actions.UPDATE_ISSUE_POSITION:
    const newSurveyPage = state.surveyPage + 1;
      return {
        ... state,
        surveyPage: newSurveyPage,
        issues: issueReducer(state.issues, action),
      }

    case actions.PREV_PAGE:
    const lastSurveyPage = state.surveyPage - 1;
      return {
        ... state,
        surveyPage: lastSurveyPage,
      }

    case actions.UPDATE_ISSUES_SELECTED:
      return {
        ... state,
        issuesComplete: false,
        surveyPage: 0,
      }

    default:
      return state;
  }
}

export default userReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns an object of outstanding issues
export const getOutstandingIssues = (issues: UserIssues): string[] => Object.keys(issues).filter(issue => issues[issue] === null);
