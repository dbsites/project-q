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
};

const issueReducer = (state: UserIssues, action: any): UserIssues => {
  switch (action.type) {
    case actions.UPDATE_ISSUE:
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
      if (action.issues) {
        return {
          ...state,
          issues: action.issues,
        }
      }
      return {
        ...state,
      };
    
    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      return {
        ... state,
        issues: action.issues,
      }

    case actions.UPDATE_ISSUE:
      return {
        ... state,
        issues: issueReducer(state.issues, action),
      }

    default:
      return state;
  }
}

export default userReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns an object of outstanding issues
export const getOutstandingIssues = (issues: UserIssues): string[] => Object.keys(issues).filter(issue => issues[issue] === null);
