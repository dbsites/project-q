/**
 * @module userReducer
 * @description Reducer for User Object
 */

import * as actions from '../actions/actionTypes';

// Define initial state
const initialUserState: any = {
  isAuth: true,
  issuesComplete: false,
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

    default:
      return state;
  }
}

export default userReducer;