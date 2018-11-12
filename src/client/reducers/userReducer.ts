/**
 * @module userReducer
 * @description Reducer for User Object
 */

import actions from '../actions/actionTypes';
import { UserState, UserSelectedIssues } from './types';

// Define initial state
const initialUserState: UserState = {
  userId: null,
  isAuth: null,
  selectedIssues: {},
  issuesComplete: null,
  firstName: null,
  lastName: null,
  surveyComplete: null,
  surveyPage: 0,
};

const issueReducer = (state: UserSelectedIssues, action: any): UserSelectedIssues => {
  const nextState: UserSelectedIssues = {};

  switch (action.type) {
    case actions.ADD_ISSUE:
      nextState[action.issueId] = null;
      return {
        ...state,
        ...nextState,
      };

    case actions.REMOVE_ISSUE:
      Object.keys(state).forEach((issueId) => {
        if (issueId !== action.issueId) {
          nextState[issueId] = state[issueId];
        }
      })
      return nextState;
      
    case actions.UPDATE_ISSUE_POSITION:
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
  // Destructure response object from action
  const {response} = action;
  switch (action.type) {
  
    case actions.FETCH_AUTH_SUCCESS:
    case actions.FETCH_FORM_SUCCESS:
    case actions.FETCH_LOGOUT_SUCCESS:
      return {
        ...initialUserState,
        ...response,
      };
    
    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      console.log(response);
      return {
        ...state,
        ...response,
      };

    case actions.FETCH_SUBMIT_SURVEY_SUCCESS:
      return {
        ...state,
        surveyComplete: true,
      };

    case actions.UPDATE_ISSUE_POSITION:
    const newSurveyPage = state.surveyPage + 1;
      return {
        ...state,
        surveyPage: newSurveyPage,
        selectedIssues: issueReducer(state.selectedIssues, action),
      }

    case actions.PREV_PAGE:
    const lastSurveyPage = state.surveyPage - 1;
      return {
        ...state,
        surveyPage: lastSurveyPage,
      }

    case actions.UPDATE_ISSUES_SELECTED:
      return {
        ...state,
        issuesComplete: false,
        surveyPage: 0,
      }

    case actions.ADD_ISSUE:
    case actions.REMOVE_ISSUE:
      return {
        ... state,
        selectedIssues: issueReducer(state.selectedIssues, action),
      }

    case actions.CLEAR_ISSUES:
      return {
        ...state,
        selectedIssues: {},
      }

    default:
      return state;
  }
}

export default userReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns an object of outstanding issues
export const getSelectedIssueCount = (issues: UserSelectedIssues): number => Object.keys(issues).length;
export const getOutstandingIssues = (issues: UserSelectedIssues): string[] => Object.keys(issues).filter(issue => issues[issue] === null);
