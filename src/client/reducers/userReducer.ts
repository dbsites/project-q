/**
 * @module userReducer
 * @description Reducer for User Object
 */

import actions from '../actions/actionTypes';

// Define initial state
const initialUserState: any = {
  isAuth: true,
  issues: {},
  surveyComplete: false,
};

const userReducer = (state: any = initialUserState, action: any) => {
  switch (action.type) {
    case actions.AUTH_USER:
      return {
        ...state,
        isAuth: true,
      }

    case actions.LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
      }
    
    case actions.SUBMIT_ISSUES:
      const issueState: any = {};
      action.payload.forEach((issue: string) => {
        issueState[issue] = null;
      })
      return {
        ... state,
        issues: issueState,
      }

    default:
      return state;
  }
}

export default userReducer;