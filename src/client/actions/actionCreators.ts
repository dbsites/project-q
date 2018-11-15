/**
 * @module actionCreators.ts
 * @description Synchronous and Asynchronous Action Creators
 */

// Import actionType constants
import types from './actionTypes';

// Import Redux Types
import { Dispatch, Action } from 'redux';

// Import Action Interfaces
import { formFieldObject, toggleIssueAction, updateFieldAction } from './types';

// --- Form Synchronous Action Creators --- //
export const updateField = (fieldObject: formFieldObject): updateFieldAction => ({
  type: types.UPDATE_FIELD,
  payload: fieldObject,
});

// Fetch Form Request Fail
export const fetchFormFail = (form: string, message: string) => ({
  type: types.FETCH_FORM_FAILURE,
  form: form,
  message: message,
})

// --- Issue Synchronous Action Creators --- // --- UNIT TESTING 100% --- //
export const addIssue = (issueId: string): toggleIssueAction => ({
  type: types.ADD_ISSUE,
  issueId,
})

export const removeIssue = (issueId: string): toggleIssueAction => ({
  type: types.REMOVE_ISSUE,
  issueId,
})

export const clearIssues = (): Action<string> => ({
  type: types.CLEAR_ISSUES,
});


// --- User Synchronous Action Creators --- //
export const updateIssue = (issue: any) => ({
  type: types.UPDATE_ISSUE_POSITION,
  payload: issue,
})

export const getUserIssues = () => (dispatch: any, getState: any) => {
  const { user } = getState();
  dispatch({
    type: types.GET_USER_ISSUES,
    payload: user.issuesSelected,
  })
}

// --- Company Synchronous Action Creators --- //
export const selectCompany = (event: any) => ({
  type: types.SELECT_COMPANY,
  payload: event
})

export const sortCompanyList = (event: any) => ({
  type: types.SORT_COMPANY_LIST,
  payload: event
})

export const updateIssuesSelected = () => ({
  type: types.UPDATE_ISSUES_SELECTED,
})

// Survey Question Actions
export const answerQuestion = (event: any) => ({
  type: types.ANSWER_QUESTION,
  payload: event,
})

export const prevPage = () => ({
  type: types.PREV_PAGE,
})

// --- ASYNC --- //

// Import Reducer State Interfaces
import { LoginState, RegisterState, ResetPassState } from '../reducers/types';

// Set HOST URL - TODO: Refactor
const HOST: string = 'http://localhost:3000';

// Fetch Authorization
export const fetchAuth = () => (dispatch: Dispatch) => {
  const fetchURI: string = `${HOST}/auth`;
  // Issue fetch request
  dispatch({
    type: types.FETCH_AUTH_REQUEST,
  });
  fetch(fetchURI, {
    method: 'GET',
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
  })
    .then(response => response.json())
    .then((response: any) => {
      dispatch({
        type: types.FETCH_AUTH_SUCCESS,
        response
      });
    })
    .catch(err => console.error(err));
}

// THUNK - Fetch Form Request
export const fetchFormRequest = (form: string, formFields: LoginState | RegisterState | ResetPassState) => (dispatch: Dispatch) => {
  // Derive POST request URI from form to be submitted and validate form fields
  let fetchURI: string = `${HOST}`;
  if (form === 'login') {
    fetchURI = fetchURI + '/login';
  } else if (form === 'register') {
    fetchURI = fetchURI + '/register';
  } else if (form === 'reset' && !(<ResetPassState>formFields).resetPass) {
    fetchURI = fetchURI + '/forgot';
  } else if (form === 'reset' && (<ResetPassState>formFields).resetPass) {
    fetchURI = fetchURI + '/reset';
  } else throw new Error('Something has gone wrong - please try again');
  // Issue fetch request
  fetch(fetchURI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // this line is necessary to tell the browser to hold onto cookies
    body: JSON.stringify(formFields),
  })
    .then(response => {
      console.log('pre-JSON response', response);
      if (response.status === 200) return response.json();
      if (response.status === 401) {
        dispatch({
          type: types.FETCH_FORM_FAILURE,
          form: form,
          message: 'Invalid email address or password',
        })
        throw new Error('Invalid email address or password')
      } else {
        dispatch({
          type: types.FETCH_FORM_FAILURE,
          form: form,
          message: 'Something has gone wrong - please try again',
        })
        throw new Error('Something has gone wrong - please try again')
      }
    })
    // .then(response => response.json())
    .then((response: any) => {
      dispatch({
        type: types.FETCH_FORM_SUCCESS,
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
    body: JSON.stringify({ userId: userId }),
  })
    .then(response => response.json())
    .then((response: any) => {
      dispatch({
        type: types.FETCH_LOGOUT_SUCCESS,
        response,
      });
    })
    .catch(err => console.error(err));
}

// THUNK - Fetch Issues to populate issues state (issueId, text, blurb)
export const fetchIssues = () => (dispatch: any) => {
  dispatch({
    type: types.FETCH_ISSUES_REQUEST,
  });
  fetch(`${HOST}/getIssues`)
    .then(response => response.json())
    .then((response: any) => {
      dispatch({
        type: types.FETCH_ISSUES_SUCCESS,
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
        type: types.FETCH_COMPANY_LIST,
        data
      });
      dispatch({
        type: types.ADD_COMPANY_SCORE
      });
      dispatch({
        type: types.MERGE_ISSUE_SCORES
      })
    })
    .catch((err: any) => console.error(err));
}

// THUNK - Fetch Submit User Issues
export const fetchSubmitIssuesRequest = (userId: string, selectedIssues: any) => (dispatch: Dispatch) => {
  const fetchURI: string = `${HOST}/userIssues`;
  // Issue fetch request
  dispatch({
    type: types.FETCH_SUBMIT_ISSUES_REQUEST,
  });
  fetch(fetchURI, {
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
      dispatch({
        type: types.FETCH_SUBMIT_ISSUES_SUCCESS,
        response,
      });
    })
    .catch((err: any) => console.error(err));
};

export const submitSurvey = (surveyObj: any) => (dispatch: Dispatch) => {
  // Issue Fetch Request
  dispatch({
    type: types.FETCH_SUBMIT_SURVEY_REQUEST,
  });
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
        type: types.FETCH_SUBMIT_SURVEY_SUCCESS,
        response,
      });
    })
    .catch(err => console.error(err))
}
