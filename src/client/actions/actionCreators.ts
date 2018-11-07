/**
 * @module actionCreators.ts
 * @description Action Creators
 */

// import actionType constants
import actions from './actionTypes';

import { Action } from 'redux';

const HOST: string = 'http://localhost:3000';

// TODO: Explicit type for event parameter and return value

// Form Actions
// export const nextFormPage = (): any => ({
//   type: actions.NEXT_FORM_PAGE,
// })

// Login Form Actions
export interface updateLoginFieldAction extends Action {
  type: string,
  payload: any,
}

export const updateLoginField = (event: any): updateLoginFieldAction => ({
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
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify(loginFields),
  })
    .then((response: any) => {
      dispatch({
        type: actions.FETCH_LOGIN_SUCCESS,
        response,
      });
    })
    .catch((err: any) => console.error(err));

// Register Form Actions
export interface updateRegisterFieldAction extends Action {
  type: string,
  payload: any,
}

export const updateRegisterField = (event: any): updateRegisterFieldAction => ({
  type: actions.UPDATE_REGISTER_FIELD,
  payload: event,
});

export const fetchCompanyList = () => (dispatch: any) => {
  fetch(`${HOST}/companyList`)
    .then((response: any) => response.json())
    .then((data: any) => {
      dispatch({
        type: actions.FETCH_COMPANY_LIST,
        data
      });
    })
    .catch((err: any) => console.error(err));
}

export const selectCompany = (event: any) => ({
  type: actions.SELECT_COMPANY,
  payload: event
})

export const sortCompanyList = (event: any) => ({
  type: actions.SORT_COMPANY_LIST,
  payload: event
})

// THUNK - Fetch Register Request
export const fetchRegisterRequest = (registerFields: any) => (dispatch: any) =>
  fetch(`${HOST}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify(registerFields),
  })
    .then((response: any) => {
      dispatch({
        type: actions.FETCH_REGISTER_SUCCESS,
        response,
      });
    })
    .catch((err: any) => console.error(err));

// User Object Actions TODO: Add functionality
export const authUser = (userId: string) => ({
  type: actions.AUTH_USER,
  payload: userId,
});

export const logoutUser = () => ({
  type: actions.LOGOUT_USER,
});

// TODO: Actually save issues!
export const submitIssues = (issues: string[]) => ({
  type: actions.SUBMIT_ISSUES,
  payload: issues,
})

// Issue Ranking Actions TODO: Add functionality
export const clearIssues = () => ({
  type: actions.CLEAR_ISSUES
});

export const toggleIssue = (issueName: string) => ({
  type: actions.TOGGLE_ISSUE,
  payload: issueName,
});
