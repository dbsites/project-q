/**
 * @module actionCreators.ts
 * @description Action Creators
 */

// import actionType constants
import actions from './actionTypes';

// import types
import { formFieldObject, updateFieldAction, logoutUserAction } from './types';
import { LoginState, RegisterState, UserIssues } from '../reducers/types';
import { Dispatch } from 'redux';

const HOST: string = 'http://localhost:3000';

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
  .then(response => response.json())
  .then((response: any) => {
      dispatch({
        type: actions.FETCH_FORM_SUCCESS,
        response,
      });
    })
    .catch((err: any) => console.error(err));
}

export const fetchCompanyList = () => (dispatch: any) => {
  fetch(`${HOST}/companyList`)
    .then((response: any) => response.json())
    .then((data: any) => {
      dispatch({
        type: actions.FETCH_COMPANY_LIST,
        data
      });
      dispatch({
        type: actions.ADD_COMPANY_SCORE
      });
      dispatch({
        type: actions.MERGE_ISSUE_SCORES
      })
    })
    .catch((err: any) => console.error(err));
}

export const getUserIssues = () => (dispatch: any, getState: any) => {
  const { user } = getState();
  dispatch({
    type: actions.GET_USER_ISSUES,
    payload: user.issues,
  })
}

export const selectCompany = (event: any) => ({
  type: actions.SELECT_COMPANY,
  payload: event
})

export const sortCompanyList = (event: any) => ({
  type: actions.SORT_COMPANY_LIST,
  payload: event
})

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
  issuesArr.forEach((issue: string) => issues[issue] = null);
  const bodyObj = { userId, issues };
  // Issue fetch request
  fetch(`${HOST}/userIssues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify(bodyObj),
  })
  .then(response => response.json())
  .then((response: any) => {
    dispatch({
      type: actions.FETCH_SUBMIT_ISSUES_SUCCESS,
      response,
    });
  })
  .catch((err: any) => console.error(err));
};

export const updateIssue = (issue: any) => ({
  type: actions.UPDATE_ISSUE_POSITION,
  payload: issue,
})

// Issue Ranking Actions TODO: Add functionality
export const clearIssues = () => ({
  type: actions.CLEAR_ISSUES,
});

export const updateIssuesSelected = () => ({
  type: actions.UPDATE_ISSUES_SELECTED,
})

export const toggleIssue = (issueId: string) => ({
  type: actions.TOGGLE_ISSUE,
  payload: issueId,
});

// Survey Question Actions
export const answerQuestion = (event: any) => ({
  type: actions.ANSWER_QUESTION,
  payload: event,
})

export const clearQuestions = (issueId: string) => ({
  type: actions.CLEAR_QUESTIONS,
  payload: issueId,
});

export const prevPage = () => ({
  type: actions.PREV_PAGE,
})

export const submitSurvey = (surveyObj: any) => (dispatch: Dispatch) => {
  // Issue Fetch Request
  fetch(`${HOST}/userSurvey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify(surveyObj),
  })
  .then(response => response.json())
  .then(response => {
    dispatch({
      type: actions.FETCH_SUBMIT_SURVEY_SUCCESS,
      response,
    });
  })
  .catch(err => console.error(err))
}
