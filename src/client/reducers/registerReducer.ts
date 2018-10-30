/**
 * @module registerReducer
 * @description Reducer for Registration Form
 */

import * as actions from '../actions/actionTypes';

// Define initial state
// TODO: Interface for initialRegisterState
const initialRegisterState: any = {
  firstName: '',
  lastName: '',
  registerEmail: '',
  registerPassword: '',
  confirmPassword: '',
  agreeTerms: false,
};

// TODO: Update state and action types, return value
const registerReducer: any = (state: any = initialRegisterState, action: any) => {
  switch (action.type) {

    // UPDATE_REGISTER_CHECK/FIELD - update input field (or checkbox) to value
    case actions.UPDATE_REGISTER_CHECK:
    case actions.UPDATE_REGISTER_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    // SUBMIT_REGISTER - Reset to initial State
    case actions.SUBMIT_REGISTER:
      return {
        ...initialRegisterState
      };

    default:
      return state;
  }
};

export default registerReducer;
