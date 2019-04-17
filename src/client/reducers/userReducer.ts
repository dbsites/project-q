/**
 * @module userReducer
 * @description Reducer for User Object
 * UNIT TEST COVERAGE - 0%
 */

import actions from '../actions/actionTypes';
import { UserState, UserIssuesSelected } from './types';

// Define initial state
const initialUserState: UserState = {
  userId: null,
  isAdmin: false,
  isAuth: null,
  issuesSelected: {},
  issuesComplete: null,
  firstName: null,
  lastName: null,
  onboardComplete: null,
  surveyComplete: null,
  surveyPage: 0,
};

const issueReducer = (state: UserIssuesSelected, action: any): UserIssuesSelected => {
  const nextState: UserIssuesSelected = {};

  switch (action.type) {
    case actions.UPDATE_WEIGHT:
      nextState[action.issueId] = { position: null, weight: action.weight };
      return {
        ...state,
        ...nextState
      }

    case actions.REMOVE_ISSUE:
      Object.keys(state).forEach((issueId) => {
        if (issueId !== action.issueId) {
          nextState[issueId] = state[issueId];
        }
      })
      return nextState;
      
    case actions.UPDATE_ISSUE_POSITION:
      nextState[action.issueId] = { position: action.position, weight:state[action.issueId].weight };
      return {
        ...state,
        ...nextState
      }

    case actions.ADD_ISSUE:
      nextState[action.issueId] = {position: null, weight: 5}
      return {
        ...state,
        ...nextState,
      };

    default:
      return state;

  }
}

// return Object.assign({}, state, {
//   categories: Object.assign({}, state.categories, {
//     Professional: Object.assign({}, state.Professional, {
//       active: true
//     })
//   })
// });


const userReducer = (state: UserState = initialUserState, action: any): UserState => {
  // Destructure response object from action
  const {response} = action;
  switch (action.type) {
  
    case actions.FETCH_LOGOUT_SUCCESS:
    case actions.FETCH_LOGOUT_FAILURE:
    case actions.FETCH_AUTH_FAILURE:
      return {
        ...initialUserState,
        isAuth: false,
      };

    case actions.FETCH_AUTH_SUCCESS:
    case actions.FETCH_FORM_SUCCESS:
      if (response.issuesSelected) {
        Object.keys(response.issuesSelected).forEach((issue) => {
          response.issuesSelected[issue] = {
            position: response.issuesSelected[issue].position,
            weight: response.issuesSelected[issue].weight
          }
        })
      }
      return {
        isAdmin: response.isAdmin || false,
        isAuth: response.isAuth,
        userId: response.userId,
        firstName: response.firstName,
        lastName: response.lastName,
        issuesComplete: response.issuesComplete,
        onboardComplete: response.issuesComplete,
        surveyComplete: response.surveyComplete,
        issuesSelected: response.issuesSelected || {},
        surveyPage: 0
      };

    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      return {
        ...state,
        issuesComplete: true,
        surveyPage: 0,
      };

    case actions.FETCH_SUBMIT_ISSUES_FAILURE:
      return {
        ...state,
        issuesComplete: false,
      };

    case actions.FETCH_SUBMIT_SURVEY_SUCCESS:
      return {
        ...state,
        surveyComplete: true,
      };

      case actions.FETCH_SUBMIT_SURVEY_FAILURE:
      return {
        ...state,
        surveyComplete: false,
        surveyPage: 0,
      };

    case actions.UPDATE_ISSUE_POSITION:
    const newSurveyPage = state.surveyPage + 1;
      return {
        ...state,
        surveyPage: newSurveyPage,
        issuesSelected: issueReducer(state.issuesSelected, action),
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
        onboardComplete: true,
        surveyComplete: false,
        surveyPage: 0,
      }

    case actions.ADD_ISSUE:
    case actions.UPDATE_WEIGHT:
    case actions.REMOVE_ISSUE:
      return {
        ... state,
        issuesSelected: issueReducer(state.issuesSelected, action),
      }

    case actions.CLEAR_ISSUES:
      return {
        ...state,
        issuesSelected: {},
      }

    case actions.RESTART:
      return {
        ...state,
        issuesComplete: false,
        onboardComplete: false,
        surveyComplete: false,
        issuesSelected: {},
        surveyPage: 0,
      }

    default:
      return state;
  }
}

export default userReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns an object of outstanding issues
export const getSelectedIssueCount = (issuesSelected: UserIssuesSelected): number => Object.keys(issuesSelected).length;
export const getOutstandingIssues = (issuesSelected: UserIssuesSelected): string[] => Object.keys(issuesSelected).filter(issue => issuesSelected[issue] === null);
