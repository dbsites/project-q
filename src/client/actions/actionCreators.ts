/**
 * @module actionCreators.ts
 * @description Action Creators
 */

// import actionType constants
import actions from './actionTypes';

import { formFieldObject, updateFieldAction } from './types';
import { LoginState } from '../reducers/types';

const HOST: string = 'http://localhost:3000';

// TODO: Explicit type for event parameter and return value

// Form Actions
// export const nextFormPage = (): any => ({
//   type: actions.NEXT_FORM_PAGE,
// })

// Login and Registration Form Actions
export const updateField = (fieldObject: formFieldObject): updateFieldAction => ({
  type: actions.UPDATE_FIELD,
  payload: fieldObject,
});

// THUNK - Fetch Login Request
export const fetchLoginRequest = (loginFields: LoginState) => (dispatch: any) =>
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

export const updateIssue = (issue: any) => ({
  type: actions.UPDATE_ISSUE,
  payload: issue,
})

// Issue Ranking Actions TODO: Add functionality
export const clearIssues = () => ({
  type: actions.CLEAR_ISSUES
});

export const toggleIssue = (issueName: string) => ({
  type: actions.TOGGLE_ISSUE,
  payload: issueName,
});

export const completeSurvey = () => ({
  type: actions.COMPLETE_SURVEY,
});

// Survey Question Actions
export const answerQuestion = (event: any) => ({
  type: actions.ANSWER_QUESTION,
  payload: event,
})