/**
 * @module actionCreators.ts
 * @description Action Creators
 */

// import actionType constants
import actions from './actionTypes';

// import types
import { formFieldObject, updateFieldAction } from './types';
import { LoginState, RegisterState } from '../reducers/types';
import { Dispatch } from 'redux';

const HOST: string = 'http://localhost:3000';

// Login and Registration Form Actions
export const updateField = (fieldObject: formFieldObject): updateFieldAction => ({
  type: actions.UPDATE_FIELD,
  payload: fieldObject,
});

// THUNK - Fetch Authorization
export const fetchAuth = () => (dispatch: Dispatch) => {
  const fetchURI: string = `${HOST}/auth`;
  // Issue fetch request
  fetch(fetchURI, {
    method: 'GET',
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
  })
    .then(response => response.json())
    .then((response: any) => {
      console.log('Fetch Auth Request Response: ', response);
      dispatch({
        type: actions.FETCH_AUTH_SUCCESS,
        response
      });
    })
    .catch(err => console.error(err));
}

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
      console.log('Fetch Form Request Response: ', response);
      dispatch({
        type: actions.FETCH_FORM_SUCCESS,
        response,
      });
    })
    .catch((err: any) => console.error(err));
}

// THUNK - Fetch Logout User Request
export const fetchLogout = (userId: string) => (dispatch: Dispatch) => {
  const fetchURI: string = `${HOST}/logout`;
  // Issue fetch request
  fetch(fetchURI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify({userId: userId}),
  })
    .then(response => response.json())
    .then((response: any) => {
      dispatch({
        type: actions.FETCH_LOGOUT_SUCCESS,
        response,
      });
    })
    .catch(err => console.error(err));
}

export const fetchIssues = () => (dispatch: any) => {
  fetch (`${HOST}/getIssues`)
    .then(response => response.json())
    .then((response: any) => {
      console.log('Fetch Issues Request Response: ', response);
      dispatch({
        type: actions.FETCH_ISSUES_SUCCESS,
        response,
      })
    })
    .catch(err => console.error(err));
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

// THUNK - Fetch Submit User Issues
export const fetchSubmitIssuesRequest = (userId: string, selectedIssues: any) => (dispatch: Dispatch) => {
  // Create issues object
  // Issue fetch request
  fetch(`${HOST}/userIssues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify({
      userId: userId,
      issues: selectedIssues,
    }),
  })
    .then(response => response.json())
    .then((response: any) => {
      console.log('Fetch Submit Issues Response: ', response);
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

// Issue Ranking Actions
export const clearIssues = () => ({
  type: actions.CLEAR_ISSUES,
});

export const addIssue = (issueId: string) => ({
  type: actions.ADD_ISSUE,
  issueId,
})

export const removeIssue = (issueId: string) => ({
  type: actions.REMOVE_ISSUE,
  issueId,
})

export const updateIssuesSelected = () => ({
  type: actions.UPDATE_ISSUES_SELECTED,
})

// Survey Question Actions
export const answerQuestion = (event: any) => ({
  type: actions.ANSWER_QUESTION,
  payload: event,
})

export const prevPage = () => ({
  type: actions.PREV_PAGE,
})

export const submitSurvey = (surveyObj: any) => (dispatch: Dispatch) => {
  // Issue Fetch Request
  console.log('attempting to submit survey');
  console.log(surveyObj);
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
      console.log('survey submission server response received');
      dispatch({
        type: actions.FETCH_SUBMIT_SURVEY_SUCCESS,
        response,
      });
    })
    .catch(err => console.error(err))
}
