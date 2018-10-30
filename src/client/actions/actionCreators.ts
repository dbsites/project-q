/**
 * @module actionCreators.ts
 * @description Action Creators
 */

// import actionType constants
import * as actions from './actionTypes';

// Login Form Actions
// TODO: Explicit type for event parameter and return value
export const updateLoginField: any = (event: any) => ({
  type: actions.UPDATE_LOGIN_FIELD,
  payload: event,
});

// TODO: Explicit type for event parameter and return value
export const updateLoginCheck: any = (event: any) => ({
  type: actions.UPDATE_LOGIN_CHECK,
  payload: event,
})

// TODO: Explicit type for return value
export const submitLogin: any = () => ({
  type: actions.SUBMIT_LOGIN,
});

// Register Form Actions
// TODO: Explicit type for event parameter and return value
export const updateRegisterField: any = (event: any) => ({
  type: actions.UPDATE_REGISTER_FIELD,
  payload: event,
});

// TODO: Explicit type for event parameter and return value
export const updateRegisterCheck: any = (event: any) => ({
  type: actions.UPDATE_REGISTER_CHECK,
  payload: event,
})

// TODO: Explicit type for return value
export const submitRegister: any = () => ({
  type: actions.SUBMIT_REGISTER,
});
