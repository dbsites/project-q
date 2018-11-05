/**
 * @module userReducer
 * @description Reducer for User Object
 */

import actions from '../actions/actionTypes';

// Define initial state
const initialUserState: any = {
  userId: null,
  isAuth: null,
  issues: {},
  surveyComplete: false,
};

const userReducer = (state: any = initialUserState, action: any) => {
  switch (action.type) {
    case actions.AUTH_USER:
      console.log(action);
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
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
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
        userId: null,
        issues: issueState,
      }

    default:
      return state;
  }
}

export default userReducer;