/**
 * @module actionCreators.ts
 * @description Action Creators
 */

// import actionType constants
import * as actions from './actionTypes';

const HOST: string = 'http://localhost:3000';

// TODO: Explicit type for event parameter and return value

// Form Actions
export const nextFormPage = (): any => ({
  type: actions.NEXT_FORM_PAGE,
})

// Login Form Actions
export const updateLoginField = (event: any): any => ({
  type: actions.UPDATE_LOGIN_FIELD,
  payload: event,
});

// THUNK - Fetch Login Request
export const fetchLoginRequest = (loginFields: any) => (dispatch: any) =>
  fetch(`${HOST}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginFields),
  })
  .then((response: any) => {
      dispatch({
        type: 'FETCH_LOGIN_SUCCESS',
        response,
      });
    })
    .catch((err: any) => console.error(err));

// Register Form Actions
export const updateRegisterField= (event: any): any => ({
  type: actions.UPDATE_REGISTER_FIELD,
  payload: event,
});

// THUNK - Fetch Register Request
export const fetchRegisterRequest = (registerFields: any) => (dispatch: any) =>
  fetch(`${HOST}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerFields),
  })
  .then((response: any) => {
      dispatch({
        type: 'FETCH_REGISTER_SUCCESS',
        response,
      });
    })
    .catch((err: any) => console.error(err));

