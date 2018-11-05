/**
 * @module loginReducer
 * @description Reducer for Login Form
 */

import actions from '../actions/actionTypes';

// Define initial state
// TODO: Interface for initialLoginState
const initialLoginState: any = {
  loginEmail: '',
  emailValid: false,
  loginPassword: '',
  rememberMe: true,
};

// TODO: Explicit state and action types, return value
const loginReducer = (state: any = initialLoginState, action: any): any => {
  switch (action.type) {

    // UPDATE_LOGIN_CHECK/FIELD - update input field (or checkbox) to value
    case actions.UPDATE_LOGIN_FIELD:
    // Email Validation
    let emailValid = state.emailValid;
    if (action.payload.field === 'loginEmail') {
      emailValid = action.payload.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }
      return {
        ...state,
        emailValid,
        [action.payload.field]: action.payload.value,
      };

    //  FETCH_LOGIN_SUCCESS - Reset to initial State
    case actions.FETCH_LOGIN_SUCCESS:
      return {
        ...initialLoginState
      };

    default:
      return state;
  }
};

export default loginReducer;
