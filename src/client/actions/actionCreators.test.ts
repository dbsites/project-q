// Import Mock Store, Fetch and Thunk for testing
import configureMockStore from 'redux-mock-store';
import * as fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

// Import Redux Types
import { Action, Middleware } from 'redux';

// Import Action Creators, Types and Interfaces for testing
import types from './actionTypes'
import * as actions from './actionCreators';
import { LoginState } from '../reducers/types';
import {
  IToggleIssueAction, IUpdateFieldAction, IFormSuccessAction, IFormFailureAction, 
  IFormFieldObject, IFormFetchSuccessResponseObject,
  IIssuesSuccessAction, IIssuesFailureAction, IIssuesFetchSuccessResponseObject
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
}
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
}
const stubFormFetchErrorMessage: string = 'Invalid email address or password';

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
  })

  it('fetchFormRequest returns an action indicating a request has been dispatched', () => {
    const expectedAction: Action<string> = {
      type: types.FETCH_FORM_REQUEST,
    }
    expect(actions.fetchFormRequest()).toEqual(expectedAction);
  })

  it('fetchFormSuccess, given a server response, returns an action to update form and user state', () => {
    const expectedAction: IFormSuccessAction = {
      type: types.FETCH_FORM_SUCCESS,
      response: stubFormFetchResponse,
    }
    expect(actions.fetchFormSuccess(stubFormFetchResponse)).toEqual(expectedAction);
  })

  it('fetchFormFailure, given a form and message, returns an action to update that form\'s error message', () => {
    const expectedAction: IFormFailureAction = {
      type: types.FETCH_FORM_FAILURE,
      form: stubForm,
      message: stubFormFetchErrorMessage,
    }
    expect(actions.fetchFormFailure(stubForm, stubFormFetchErrorMessage)).toEqual(expectedAction);
  })

  const matcherURL: string = 'http://localhost:3000/login';
  
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
  })

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
  })
});

// --- UNIT TESTS --- Issue Action Creators --- //
// Define sample issue fetch response and error message
const stubIssuesFetchResponse: IIssuesFetchSuccessResponseObject = {
  '580600c8-c633-476b-98d2-9676c70c177d': {
    issueId: '580600c8-c633-476b-98d2-9676c70c177d',
    issueName: 'Environment',
    issueBlurb: 'Lorem ipsum dolor sit amet',
  }
}
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
  })

  it('fetchIssuesSuccess, given a server response, returns an action to update Issues and user state', () => {
    const expectedAction: IIssuesSuccessAction = {
      type: types.FETCH_ISSUES_SUCCESS,
      response: stubIssuesFetchResponse,
    }
    expect(actions.fetchIssuesSuccess(stubIssuesFetchResponse)).toEqual(expectedAction);
  })

  it('fetchIssuesFailure, given a Issues and message, returns an action to update that Issues\'s error message', () => {
    const expectedAction: IIssuesFailureAction = {
      type: types.FETCH_ISSUES_FAILURE,
      message: stubIssueFetchErrorMessage,
    }
    expect(actions.fetchIssuesFailure(stubIssueFetchErrorMessage)).toEqual(expectedAction);
  })

  const matcherURL: string = 'http://localhost:3000/getIssues';

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
  })

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
  })
});

// --- UNIT TESTS --- User Action Creators --- //
// Define sample issueId
const stubIssueId: string = v4();
const stubPosition: string = 'strong pro';

describe('Functionality Test: User Action Creators', () => {

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
  })
  
})