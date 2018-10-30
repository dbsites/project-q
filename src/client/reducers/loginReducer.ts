/**
 * @module loginReducer
 * @description Reducer for Login Form
 */

import * as actions from '../actions/actionTypes';

// Define initial state
// TODO: Interface for initialLoginState
const initialLoginState: any = {
  loginEmail: '',
  loginPassword: '',
  rememberMe: true,
};

// TODO: Explicit state and action types, return value
const loginReducer: any = (state: any = initialLoginState, action: any) => {
  switch (action.type) {

    // UPDATE_LOGIN_CHECK/FIELD - update input field (or checkbox) to value
    case actions.UPDATE_LOGIN_CHECK:
    case actions.UPDATE_LOGIN_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    // SUBMIT_LOGIN - Reset to initial State
    case actions.SUBMIT_LOGIN:
      return {
        ...initialLoginState
      };

    default:
      return state;
  }
};

export default loginReducer;
