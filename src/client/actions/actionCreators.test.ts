// Import Mock Store, Fetch and Thunk for testing
import configureMockStore from 'redux-mock-store';
import * as fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

// Import Redux Types
import { Action, Middleware } from 'redux';

// Import Action Creators, Types and Interfaces for testing
import types from './actionTypes'
import * as actions from './actionCreators';
import { LoginState, SurveyState, UserIssuesSelected } from '../reducers/types';
import {
  IToggleIssueAction, IUpdateFieldAction, IFormSuccessAction, IFormFailureAction, 
  IFormFieldObject, IFormFetchSuccessResponseObject,
  IIssuesSuccessAction, IIssuesFetchSuccessResponseObject, IFetchFailureAction, IAuthSuccessAction, INoAuthObject, ISubmitIssuesSuccessAction
} from './types';

// Import Random ID generator
import { v4 } from 'uuid';

// Configure Mocks (store and error logging)
const middleware: Middleware[] = [thunk];
const mockStore = configureMockStore(middleware);

// --- UNIT TESTS --- Form Action Creators --- //
// Define sample fetch form, form field, form fetch request body, and form fetch response
const stubForm: string = 'login';
const stubFormFieldObject: IFormFieldObject = {
  form: stubForm,
  field: 'loginEmail',
  type: 'text',
  value: 'test@test.com',
};
const stubFormFetchRequestBody: LoginState = { 
  loginEmail: 'test@test.com',
  emailValid: true,
  loginPassword: 's3cretp@ss',
  rememberMe: true,
  loginError: '',
};
const stubFormFetchResponse: IFormFetchSuccessResponseObject = {
  isAuth: true,
  firstName: 'test',
  lastName: 'test',
  userId: v4(),
  issuesComplete: false,
  surveyComplete: false,
  issuesSelected: {},
  questions: {},
};
const stubFormFetchErrorMessage: string = 'Invalid email address or password';

const stubUserId: string = v4();

describe('Functionality Test: Form Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('updateField, given a form field object, returns an action to update that form field', () => {
    const expectedAction: IUpdateFieldAction = {
      type: types.UPDATE_FIELD,
      formFieldObject: stubFormFieldObject,
    }
    expect(actions.updateField(stubFormFieldObject)).toEqual(expectedAction);
  });

  it('fetchFormRequest returns an action indicating a request has been dispatched', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_FORM_REQUEST,
    }
    expect(actions.fetchFormRequest()).toEqual(expectedAction);
  });

  it('fetchFormSuccess, given a server response, returns an action to update form and user state', () => {
    const expectedAction: IFormSuccessAction = {
      type: types.FETCH_FORM_SUCCESS,
      response: stubFormFetchResponse,
    }
    expect(actions.fetchFormSuccess(stubFormFetchResponse)).toEqual(expectedAction);
  });

  it('fetchFormFailure, given a form and message, returns an action to update that form\'s error message', () => {
    const expectedAction: IFormFailureAction = {
      type: types.FETCH_FORM_FAILURE,
      form: stubForm,
      message: stubFormFetchErrorMessage,
    }
    expect(actions.fetchFormFailure(stubForm, stubFormFetchErrorMessage)).toEqual(expectedAction);
  });

  const matcherURL: string = '/api/login';
  
  it('fetchForm, given a successful state, returns an action indicating a fetch request and fetch success', () => {
    fetchMock.postOnce(matcherURL, {
      body: stubFormFetchResponse,
      status: 200,
    })
    const expectedActions = [
      { type: types.FETCH_FORM_REQUEST },
      { type: types.FETCH_FORM_SUCCESS, response: stubFormFetchResponse },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchForm(stubForm, stubFormFetchRequestBody) as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('fetchForm, given a failed state, returns an action indicating a fetch failure and an error message', () => {
    fetchMock.postOnce(matcherURL, {
      status: 401
    })
    const expectedActions = [
      { type: types.FETCH_FORM_REQUEST },
      { type: types.FETCH_FORM_FAILURE, form: stubForm, message: stubFormFetchErrorMessage },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchForm(stubForm, stubFormFetchRequestBody) as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });
});

// --- UNIT TESTS --- Issue Action Creators --- //
// Define sample issue fetch response and error message
const stubIssuesFetchResponse: IIssuesFetchSuccessResponseObject = {
  '580600c8-c633-476b-98d2-9676c70c177d': {
    issueId: '580600c8-c633-476b-98d2-9676c70c177d',
    issueName: 'Environment',
    issueBlurb: 'Lorem ipsum dolor sit amet',
  }
};
const stubIssueFetchErrorMessage: string = 'Something has gone wrong - please try again';

describe('Functionality Test: Issue Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetchIssuesRequest returns an action indicating a request has been dispatched', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_ISSUES_REQUEST,
    }
    expect(actions.fetchIssuesRequest()).toEqual(expectedAction);
  });

  it('fetchIssuesSuccess, given a server response, returns an action to update Issues and user state', () => {
    const expectedAction: IIssuesSuccessAction = {
      type: types.FETCH_ISSUES_SUCCESS,
      response: stubIssuesFetchResponse,
    }
    expect(actions.fetchIssuesSuccess(stubIssuesFetchResponse)).toEqual(expectedAction);
  });

  it('fetchIssuesFailure, given a Issues and message, returns an action to update that Issues\'s error message', () => {
    const expectedAction: IFetchFailureAction = {
      type: types.FETCH_ISSUES_FAILURE,
      message: stubIssueFetchErrorMessage,
    }
    expect(actions.fetchIssuesFailure(stubIssueFetchErrorMessage)).toEqual(expectedAction);
  });

  const matcherURL: string = '/api/getIssues';

  it('fetchIssues, given a successful state, returns an action indicating a fetch request and fetch success', () => {
    fetchMock.getOnce(matcherURL, {
      status: 200,
      body: stubIssuesFetchResponse
    })
    const expectedActions = [
      { type: types.FETCH_ISSUES_REQUEST },
      { type: types.FETCH_ISSUES_SUCCESS, response: stubIssuesFetchResponse },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchIssues() as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('fetchIssues, given a failed state, returns an action indicating a fetch failure and an error message', () => {
      fetchMock.getOnce(matcherURL, {
      status: 501
    })
    const expectedActions = [
      { type: types.FETCH_ISSUES_REQUEST },
      { type: types.FETCH_ISSUES_FAILURE, message: stubIssueFetchErrorMessage },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchIssues() as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });
});

// --- UNIT TESTS --- User Action Creators --- //
describe('Functionality Test: Synchronous User Action Creators', () => {
  // Define sample issueId/position
  const stubIssueId: string = v4();
  const stubPosition: string = 'strong pro';

  it('clearIssues returns an action to clear all issues', () => {
    const expectedAction: Action<string> = {
      type: types.CLEAR_ISSUES,
    };
    expect(actions.clearIssues()).toEqual(expectedAction);
  });

  it('addIssue, given an issueId, returns an action to add that issue', () => {
    const expectedAction: IToggleIssueAction = {
      type: types.ADD_ISSUE,
      issueId: stubIssueId,
    };
    expect(actions.addIssue(stubIssueId)).toEqual(expectedAction);
  }); 

  it('removeIssue, given an issueId, returns an action to remove that issue', () => {
    const expectedAction: IToggleIssueAction = {
      type: types.REMOVE_ISSUE,
      issueId: stubIssueId,
    }
    expect(actions.removeIssue(stubIssueId)).toEqual(expectedAction);
  });

  it('updateIssuesSelected returns an action to reselect issues', () => {
    const expectedAction: Action<string> = {
      type: types.UPDATE_ISSUES_SELECTED,
    }
    expect(actions.updateIssuesSelected()).toEqual(expectedAction);
  });

  it('updateIssuePosition, given an issueId and position, returns an action to update the user position on that issue', () => {
    const expectedAction: any = {
      type: types.UPDATE_ISSUE_POSITION,
      issueId: stubIssueId,
      position: stubPosition,
    };
    expect(actions.updateIssuePosition(stubIssueId, stubPosition)).toEqual(expectedAction);
  });
});

describe('Functionality Test: Asynchronous User Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  // Define sample failed Auth Response
  const stubNoAuthFetchResponse: INoAuthObject = { isAuth: false }

  it('fetchAuthRequest returns an action indicating a request has been dispatched', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_AUTH_REQUEST,
    }
    expect(actions.fetchAuthRequest()).toEqual(expectedAction);
  });

  it('fetchAuthSuccess, given a server response, returns an action to update user state', () => {
    const expectedAction: IAuthSuccessAction = {
      type: types.FETCH_AUTH_SUCCESS,
      response: stubFormFetchResponse,
    }
    expect(actions.fetchAuthSuccess(stubFormFetchResponse)).toEqual(expectedAction);
  });

  it('fetchAuthFailure returns an action to reset user state', () => {
    const expectedAction: Action<string>= {
      type: types.FETCH_AUTH_FAILURE,
    }
    expect(actions.fetchAuthFailure()).toEqual(expectedAction);
  });

  const matcherAuthURL: string = '/api/auth';

  it('fetchAuth, with successful auth, returns an action indicating a auth request and fetch success to reset user state', () => {
    fetchMock.getOnce(matcherAuthURL, {
      status: 200,
      body: stubFormFetchResponse
    })
    const expectedActions = [
      { type: types.FETCH_AUTH_REQUEST },
      { type: types.FETCH_AUTH_SUCCESS, response: stubFormFetchResponse },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchAuth() as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('fetchAuth, without successful auth, returns an action indicating a fetch failure to reset user state', () => {
    fetchMock.getOnce(matcherAuthURL, {
    body: stubNoAuthFetchResponse,
  })
  const expectedActions = [
    { type: types.FETCH_AUTH_REQUEST },
    { type: types.FETCH_AUTH_FAILURE },
  ];
  const store = mockStore({});
  return store.dispatch(actions.fetchAuth() as any) // TODO: Refactor to precision
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it('fetchLogoutRequest returns an action indicating a request has been dispatched', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_LOGOUT_REQUEST,
    }
    expect(actions.fetchLogoutRequest()).toEqual(expectedAction);
  });

  it('fetchLogoutSuccess, given a server response, returns an action to reset user state', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_LOGOUT_SUCCESS,
    }
    expect(actions.fetchLogoutSuccess()).toEqual(expectedAction);
  });

  it('fetchLogoutFailure, given a Issues and message, returns an action to reset user state', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_LOGOUT_FAILURE,
    }
    expect(actions.fetchLogoutFailure()).toEqual(expectedAction);
  });

  const matcherLogoutURL: string = '/api/logout';

  it('fetchLogout, given a userId, returns an action indicating a logout request and logout success to reset user state', () => {
    fetchMock.postOnce(matcherLogoutURL, {
      status: 200,
    })
    const expectedActions = [
      { type: types.FETCH_LOGOUT_REQUEST },
      { type: types.FETCH_LOGOUT_SUCCESS },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchLogout(stubUserId) as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('fetchLogout, if an error is thrown, returns an action indicating a fetch failure to reset user state', () => {
    fetchMock.postOnce(matcherLogoutURL, {
      throws: 'Logout Error',
    })
    const expectedActions = [
      { type: types.FETCH_LOGOUT_REQUEST },
      { type: types.FETCH_LOGOUT_FAILURE },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchLogout(stubUserId) as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });
});

// Define sample submit issues request and response
const stubSubmitIssuesFetchRequest: UserIssuesSelected = {
  '580600c8-c633-476b-98d2-9676c70c177d': null,
};

const stubSubmitIssuesFetchSuccessResponse: SurveyState = {
  '580600c8-c633-476b-98d2-9676c70c177d': {
    '7d2144fc-225b-4e5c-9d56-a0ecd4bbf8a0': {
      agree: null,
      position: 'pro',
      questionId: '7d2144fc-225b-4e5c-9d56-a0ecd4bbf8a0',
      questionText: 'Sample Question Text',
    }
  },
};

describe('Functionality Test: Asynchronous Survey Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetchSubmitIssuesRequest returns an action indicating a request has been dispatched', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_SUBMIT_ISSUES_REQUEST,
    }
    expect(actions.fetchSubmitIssuesRequest()).toEqual(expectedAction);
  });

  it('fetchSubmitIssuesSuccess, given a server response, returns an action to populate survey and update user state', () => {
    const expectedAction: ISubmitIssuesSuccessAction = {
      type: types.FETCH_SUBMIT_ISSUES_SUCCESS,
      response: stubSubmitIssuesFetchSuccessResponse,
    }
    expect(actions.fetchSubmitIssuesSuccess(stubSubmitIssuesFetchSuccessResponse)).toEqual(expectedAction);
  });

  it('fetchSubmitIssuesFailure returns an action to maintain issuesComplete state', () => {
    const expectedAction: Action<string>= {
      type: types.FETCH_SUBMIT_ISSUES_FAILURE,
    }
    expect(actions.fetchSubmitIssuesFailure()).toEqual(expectedAction);
  });

  const matcherSubmitIssuesURL: string = '/api/userIssues';

  it('fetchSubmitIssues, given UserIssuesSelected, returns an action indicating a auth request and fetch success to populate survey', () => {
    fetchMock.postOnce(matcherSubmitIssuesURL, {
      status: 200,
      body: stubSubmitIssuesFetchSuccessResponse
    })
    const expectedActions = [
      { type: types.FETCH_SUBMIT_ISSUES_REQUEST },
      { type: types.FETCH_SUBMIT_ISSUES_SUCCESS, response: stubSubmitIssuesFetchSuccessResponse },
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchSubmitIssues(stubUserId, stubSubmitIssuesFetchRequest) as any) // TODO: Refactor to precision
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('fetchSubmitIssues, if an error is thrown, returns an action retaining issuesSelected as false', () => {
    fetchMock.postOnce(matcherSubmitIssuesURL, {
      throws: 'Submission Error',
  })
  const expectedActions = [
    { type: types.FETCH_SUBMIT_ISSUES_REQUEST },
    { type: types.FETCH_SUBMIT_ISSUES_FAILURE },
  ];
  const store = mockStore({});
  return store.dispatch(actions.fetchSubmitIssues('wrongUserId', stubSubmitIssuesFetchRequest) as any) // TODO: Refactor to precision
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });
});