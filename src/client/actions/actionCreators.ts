/**
 * @module actionCreators.ts
 * @description Synchronous and Asynchronous Action Creators
 */

// Import actionType constants
import types from './actionTypes';

// Import Redux Types
import { Action, Dispatch } from 'redux';

// Import Action Interfaces
import {
  ISetDeviceAction,                                           // Device Action Interface
  ISetModalAction,                                            // Modal Action Interface
  IFetchFailureAction,                                        // Fetch Failure Action Interface
  IFormFieldObject, IFormFetchSuccessResponseObject,          // Form Request and Response Interfaces
  IUpdateFieldAction, IFormSuccessAction, IFormFailureAction, // Form Action Interfaces
  IToggleIssueAction, IUpdateIssuePositionAction,             // User Action Interfaces
  IIssuesSuccessAction,                                       // Issue Action Interfaces
  IIssuesFetchSuccessResponseObject,
  INoAuthObject,
  IAuthSuccessAction,
  ISubmitIssuesSuccessAction // Issues Resposne Interface
} from './types';

// Import Reducer State Interfaces
import {
  LoginState,
  RegisterState,
  ForgotPassState,
  ResetPassState,
  SurveyState,
  UserIssuesSelected
} from '../reducers/types';

// --- Device Action Creators --- // --- UNIT TESTING 100% --- //
export const setDevice = (deviceType: string): ISetDeviceAction => ({
  type: types.SET_DEVICE,
  deviceType
});

// --- Modal Action Creators --- // --- UNIT TESTING 100% --- //
export const setModal = (modalType: string): ISetModalAction => ({
  type: types.SET_MODAL,
  modalType,
})

export const clearModal = (): Action<string> => ({
  type: types.CLEAR_MODAL,
})

// --- Form Action Creators --- // --- UNIT TESTING 100% --- //
// Description: Action Creators to update form fields and submit forms with fetch request
export const updateField = (
  formFieldObject: IFormFieldObject
): IUpdateFieldAction => ({
  type: types.UPDATE_FIELD,
  formFieldObject
});

export const fetchFormRequest = (): Action<string> => ({
  type: types.FETCH_FORM_REQUEST
});

export const fetchFormSuccess = (
  response: IFormFetchSuccessResponseObject
): IFormSuccessAction => ({
  type: types.FETCH_FORM_SUCCESS,
  response
});

export const fetchFormFailure = (
  form: string,
  message: string
): IFormFailureAction => ({
  type: types.FETCH_FORM_FAILURE,
  form: form,
  message: message
});

export const fetchForm = (
  form: string,
  formFields: LoginState | RegisterState | ForgotPassState | ResetPassState
) => (dispatch: Dispatch) => {
  dispatch(fetchFormRequest());
  // Derive POST request URI from form to be submitted and issue fetch request

  const fetchURI: string = `/api/${form}`;
  return fetch(fetchURI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(formFields)
  })
    .then((response: Response) => {
      // If successful(200), return parsed response, otherwise dispatch failure and throw error
      if (response.status === 200) return response.json();
      if (response.status === 401)
        throw new Error('Invalid email address or password');
      throw new Error('Something has gone wrong - please try again');
    })
    .then((response: IFormFetchSuccessResponseObject) => {
      // set onboardComplete equal to issuesComplete
      return dispatch(fetchFormSuccess(response));
    })
    .catch((error: Error) => dispatch(fetchFormFailure(form, error.message)));
};

// --- Issue Action Creators --- // --- UNIT TESTING 100% --- //
// Description: Action Creators to populate issues state (issueId, text, blurb) with fetch request
export const fetchIssuesRequest = (): Action<string> => ({
  type: types.FETCH_ISSUES_REQUEST
});

export const fetchIssuesSuccess = (
  response: IIssuesFetchSuccessResponseObject
): IIssuesSuccessAction => ({
  type: types.FETCH_ISSUES_SUCCESS,
  response
});

export const fetchIssuesFailure = (message: string): IFetchFailureAction => ({
  type: types.FETCH_ISSUES_FAILURE,
  message: message
});

export const fetchIssues = () => (dispatch: any) => {
  dispatch(fetchIssuesRequest());

  // Issue fetch request
  return fetch('/api/getIssues')
    .then((response: Response) => {
      // If successful(200), return parsed response, otherwise dispatch failure and throw error
      if (response.status === 200) return response.json();
      throw new Error('Something has gone wrong - please try again');
    })
    .then((response: IIssuesFetchSuccessResponseObject) =>
      dispatch(fetchIssuesSuccess(response))
    )
    .catch((error: Error) => dispatch(fetchIssuesFailure(error.message)));
};

// --- Sync User Action Creators --- // --- UNIT TESTING 100% --- //
export const restart = (): Action<string> => ({
  type: types.RESTART
});

export const clearIssues = (): Action<string> => ({
  type: types.CLEAR_ISSUES
});

export const addIssue = (issueId: string): IToggleIssueAction => ({
  type: types.ADD_ISSUE,
  issueId
});

export const removeIssue = (issueId: string): IToggleIssueAction => ({
  type: types.REMOVE_ISSUE,
  issueId
});

export const updateIssuesSelected = (): Action<string> => ({
  type: types.UPDATE_ISSUES_SELECTED
});

export const updateIssuePosition = (
  issueId: string,
  position: string
): IUpdateIssuePositionAction => ({
  type: types.UPDATE_ISSUE_POSITION,
  issueId,
  position
});

// --- Async User Action Creators --- // --- UNIT TESTING 100% --- //
// Description: Action Creators to populate user state following fetch request
export const fetchAuthRequest = (): Action<string> => ({
  type: types.FETCH_AUTH_REQUEST
});

export const fetchAuthSuccess = (
  response: IFormFetchSuccessResponseObject
): IAuthSuccessAction => ({
  type: types.FETCH_AUTH_SUCCESS,
  response
});

export const fetchAuthFailure = (): Action<string> => ({
  type: types.FETCH_AUTH_FAILURE
});

export const fetchAuth = () => (dispatch: Dispatch) => {
  dispatch(fetchAuthRequest());
  // Issue fetch request
  return fetch('/api/auth', {
    method: 'GET',
    credentials: 'include'
  })
    .then((response: Response) => response.json())
    .then((response: IFormFetchSuccessResponseObject | INoAuthObject) => {
      if (!response.isAuth) dispatch(fetchAuthFailure());
      else
        dispatch(fetchAuthSuccess(response as IFormFetchSuccessResponseObject));
    })
    .catch(() => dispatch(fetchAuthFailure()));
};

// Description: Action Creators to reset user state following fetch request
export const fetchLogoutRequest = (): Action<string> => ({
  type: types.FETCH_LOGOUT_REQUEST
});

export const fetchLogoutSuccess = (): Action<string> => ({
  type: types.FETCH_LOGOUT_SUCCESS
});

export const fetchLogoutFailure = (): Action<string> => ({
  type: types.FETCH_LOGOUT_FAILURE
});

export const fetchLogout = (userId: string) => (dispatch: Dispatch) => {
  dispatch(fetchLogoutRequest());
  // Issue fetch request
  return fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ userId: userId })
  })
    .then(() => dispatch(fetchLogoutSuccess()))
    .catch(() => dispatch(fetchLogoutFailure()));
};

// --- Async Survey Action Creators --- // --- UNIT TESTING 100% --- //
// Description: Action Creators to update survey following fetch request (note: Also updates user state)
export const fetchSubmitIssuesRequest = (): Action<string> => ({
  type: types.FETCH_SUBMIT_ISSUES_REQUEST
});

export const fetchSubmitIssuesSuccess = (
  response: SurveyState
): ISubmitIssuesSuccessAction => ({
  type: types.FETCH_SUBMIT_ISSUES_SUCCESS,
  response
});

export const fetchSubmitIssuesFailure = (): Action<string> => ({
  type: types.FETCH_SUBMIT_ISSUES_FAILURE
});

export const fetchSubmitIssues = (
  userId: string,
  selectedIssues: UserIssuesSelected
) => (dispatch: Dispatch) => {
  dispatch(fetchSubmitIssuesRequest());
  // Issue fetch request
  return fetch('/api/userIssues', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      userId: userId,
      issues: selectedIssues
    })
  })
    .then((response: Response) => response.json())
    .then((response: SurveyState) => {
      dispatch({
        type: types.FETCH_SUBMIT_ISSUES_SUCCESS,
        response
      });
    })
    .catch(() => dispatch(fetchSubmitIssuesFailure()));
};

// --- Survey Synchronous Action Creators --- // --- UNIT TESTING 0% --- // TODO: TESTING
export const answerQuestion = (event: any) => ({
  type: types.ANSWER_QUESTION,
  payload: event
});

export const prevPage = () => ({
  type: types.PREV_PAGE
});

// --- User Synchronous Action Creators --- // TODO: REFACTOR getUserIssues to function selector
export const getUserIssues = () => (dispatch: any, getState: any) => {
  const { user } = getState();
  dispatch({
    type: types.GET_USER_ISSUES,
    payload: user.issuesSelected
  });
};

// --- Company Synchronous Action Creators --- //
export const selectCompany = (event: any) => ({
  type: types.SELECT_COMPANY,
  payload: event
});

export const sortCompanyList = (event: any) => ({
  type: types.SORT_COMPANY_LIST,
  payload: event
});

export const addCompanyScore = () => ({
  type: types.ADD_COMPANY_SCORE
});

export const mergeIssueScores = () => ({
  type: types.MERGE_ISSUE_SCORES
});

export const setDefaultCompany = () => ({
  type: types.SET_DEFAULT_COMPANY
});

export const resetUserIssues = () => ({
  type: types.RESET_USER_ISSUES
});

export const hoverOn = (info: any) => ({
  type: types.HOVER_ON,
  payload: info
})

export const hoverOff = () => ({
  type: types.HOVER_OFF
})

export const togglePortfolio = (mode: string) => ({
  type: types.TOGGLE_PORTFOLIO,
  payload: mode
})

export const filterSector = (sec: string) => ({
  type: types.FILTER_SECTOR,
  payload: sec
})

export const toggleStocksVisualizer = () => ({
  type: types.TOGGLE_STOCKS_VISUALIZER,
});

export const setStocksVisualizerData = (payload: any) => ({
  type: types.SET_STOCKS_VISUALIZER_DATA,
  payload,
});

export const setTopStocksFilter = (payload: number) => ({
  type: types.SET_TOP_STOCKS_COUNT,
  payload,
});

export const calcStocksVisualizerPending = () => ({
  type: types.CALC_STOCKS_VISUALIZER_PENDING,
});
export const calcStocksVisualizerSuccess = () => ({
  type: types.CALC_STOCKS_VISUALIZER_SUCCESS,
});
export const calcStocksVisualizerError = () => ({
  type: types.CALC_STOCKS_VISUALIZER_ERROR,
});
export const calcStocksVisualizerStop = () => ({
  type: types.CALC_STOCKS_VISUALIZER_STOP,
});

// --- ASYNC --- //
export const fetchCompanyList = () => (dispatch: any, getState: any) => {
  fetch('/api/companyList')
    .then((response: any) => response.json())
    .then((data: any) => {
      dispatch({
        type: types.FETCH_COMPANY_LIST,
        data
      });
    })
    .then(() => dispatch(addCompanyScore()))
    .then(() => dispatch(mergeIssueScores()))
    .then(() => dispatch(setDefaultCompany()))
    .then(() => {
      const { company } = getState();
      const { ticker } = company.selectedCompany;
      dispatch(getStockData(ticker));
      dispatch(getSelectedCompanyInfo(ticker));
    })
    .catch((err: any) => console.error(err));
};

export const getStockData = (ticker: string) => (dispatch: any) => {
  fetch('/api/stockData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticker })
  })
    .then(response => response.json())
    .then((data: any) => {
      dispatch({
        type: types.GET_STOCK_INFO,
        payload: data
      });
    })
    .catch((err: any) => console.error(err));
};

export const getAllCompanyInfo = () => (dispatch: any) => {
  fetch('/api/moduleData')
    .then(response => response.json())
    .then((response: any) => {
      dispatch({
        type: types.GET_ALL_COMPANY_INFO,
        payload: {
          modalData: response.moduleData,
          politicianData: response.politicianData
        }
      });
    })
    .catch((err: any) => console.error(err));
};

export const getSelectedCompanyInfo = (ticker: string) => (
  dispatch: any,
  getState: any
) => {
  const { company } = getState();
  const { fullCompanyModal, fullCompanyPolit } = company;

  if (fullCompanyModal && fullCompanyPolit) {
    const { full_name } = company.selectedCompany;
    const moduleData = company.fullCompanyModal[full_name][0];
    const politData = company.fullCompanyPolit[full_name][0];

    dispatch({
      type: types.GET_SELECTED_COMPANY_INFO,
      payload: {
        moduleData,
        politData
      }
    });
  } else {
    fetch('/api/companyModule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ticker })
    })
      .then(response => response.json())
      .then((response: any) => {
        dispatch({
          type: types.GET_SELECTED_COMPANY_INFO,
          payload: {
            moduleData: response.moduleData,
            politData: response.politicianData
          }
        });
      })
      .catch((err: any) => console.error(err));
  }
};

export const submitSurvey = (surveyObj: any) => (dispatch: Dispatch) => {
  dispatch({
    type: types.FETCH_SUBMIT_SURVEY_REQUEST
  });
  // Issue Fetch Request
  fetch('/api/userSurvey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(surveyObj)
  })
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: types.FETCH_SUBMIT_SURVEY_SUCCESS,
        response
      });
    })
    .catch(err => console.error(err));
};
