/**
 * @module actionCreators.ts
 * @description Action Creators
 */

// import actionType constants
import actions from './actionTypes';

import { formFieldObject, updateFieldAction, logoutUserAction } from './types';
import { LoginState, RegisterState, UserIssues } from '../reducers/types';
import { Dispatch } from 'redux';

const HOST: string = 'http://localhost:3000';

// Form Actions
// export const nextFormPage = (): any => ({
//   type: actions.NEXT_FORM_PAGE,
// })

// Login and Registration Form Actions
export const updateField = (fieldObject: formFieldObject): updateFieldAction => ({
  type: actions.UPDATE_FIELD,
  payload: fieldObject,
});

// THUNK - Fetch Form Request
export const fetchFormRequest = (form: string, formFields: LoginState | RegisterState) => (dispatch: Dispatch) => {
  // Determine fetch URI
  let fetchURI: string = `${HOST}`;
  if (form === 'login') {
    fetchURI = fetchURI + '/login';
  } else if (form === 'register') {
    fetchURI = fetchURI + '/register';
  } else throw new Error();
  // Issue fetch request
  fetch(fetchURI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify(formFields),
  })
  .then((response: any) => {
      dispatch({
        type: actions.FETCH_FORM_SUCCESS,
        response,
      });
    })
  .catch((err: any) => console.error(err));
}

// User Object Actions TODO: Add functionality
export const authUser = (userId: string) => ({
  type: actions.AUTH_USER,
  payload: userId,
});

export const logoutUser = (): logoutUserAction => ({
  type: actions.LOGOUT_USER,
});

// THUNK - Fetch Submit User Issues
export const fetchSubmitIssuesRequest = (userId: string, issuesArr: string[]) => (dispatch: Dispatch) => {
  // Create issues object
  const issues: UserIssues = {};
  console.log('IssuesArr: ', issuesArr);
  issuesArr.forEach((issue: string) => issues[issue] = null );
  const bodyObj = {userId, issues};
  console.log(bodyObj);
  // Issue fetch request
  fetch(`${HOST}/userIssues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify(bodyObj),
  })
  .then((response: any) => {
      dispatch({
        type: actions.FETCH_SUBMIT_ISSUES_SUCCESS,
        response,
      });
    })
  .catch((err: any) => console.error(err));
};

export const updateIssue = (issue: any) => ({
  type: actions.UPDATE_ISSUE,
  payload: issue,
})

// Issue Ranking Actions TODO: Add functionality
export const clearIssues = () => ({
  type: actions.CLEAR_ISSUES
});

export const toggleIssue = (issueId: string) => ({
  type: actions.TOGGLE_ISSUE,
  payload: issueId,
});

export const completeSurvey = () => ({
  type: actions.COMPLETE_SURVEY,
});

// Survey Question Actions
export const answerQuestion = (event: any) => ({
  type: actions.ANSWER_QUESTION,
  payload: event,
})
