/**
 * @module loadingReducerTest
 * @description Unit Tests for Loading Reducer
 */

import loadingReducer, { initialLoadingState } from './loadingReducer';

// Import action creators to generate loading actions
import {
  fetchAuthRequest, fetchAuthSuccess, fetchAuthFailure,
  fetchLogoutRequest, fetchLogoutSuccess, fetchLogoutFailure,
  fetchIssuesRequest, fetchIssuesSuccess, fetchIssuesFailure,
  fetchSubmitIssuesRequest, fetchSubmitIssuesSuccess, fetchSubmitIssuesFailure,
} from '../actions/actionCreators';

import { LoadingState } from './types';

// Import Templates for Testing
import {
  stubFormFetchSuccessResponse,
  stubIssuesFetchSuccessResponse, stubIssueFetchErrorMessage,
  stubSubmitIssuesFetchSuccessResponse
} from '../actions/templates';

// Helper Function to generate sample state
const generateLoadingState = (key: string, loading: boolean): LoadingState => {
  initialLoadingState[key] = loading;
  return initialLoadingState;
}

describe('Functionality Test: Loading Reducer', () => {
  it('Should return initial state by default', () => {
    expect(loadingReducer(undefined, {}))
      .toEqual(initialLoadingState)
  })

  it('Should update authLoading to true upon auth request', () => {
    expect(loadingReducer(generateLoadingState('authLoading', false), fetchAuthRequest()).authLoading)
      .toEqual(true);
  })

  it('Should update authLoading to false upon auth success', () => {
    expect(loadingReducer(generateLoadingState('authLoading', true), fetchAuthSuccess(stubFormFetchSuccessResponse)).authLoading)
      .toEqual(false);
  })

  it('Should update authLoading to false upon auth failure', () => {
    expect(loadingReducer(generateLoadingState('authLoading', true), fetchAuthFailure()).authLoading)
      .toEqual(false);
  })

  it('Should update issuesLoading to true upon fetch issues request', () => {
    expect(loadingReducer(generateLoadingState('issuesLoading', false), fetchIssuesRequest()).issuesLoading)
      .toEqual(true);
  })
  
  it('Should update issuesLoading to false upon fetch issues success', () => {
    expect(loadingReducer(generateLoadingState('issuesLoading', true), fetchIssuesSuccess(stubIssuesFetchSuccessResponse)).issuesLoading)
      .toEqual(false);
  })

  it('Should update issuesLoading to false upon fetch issues failure', () => {
    expect(loadingReducer(generateLoadingState('issuesLoading', true), fetchIssuesFailure(stubIssueFetchErrorMessage)).issuesLoading)
      .toEqual(false);
  })

  it('Should update logoutLoading to true upon fetch logout request', () => {
    expect(loadingReducer(generateLoadingState('logoutLoading', false), fetchLogoutRequest()).logoutLoading)
      .toEqual(true);
  })
  
  it('Should update logoutLoading to false upon fetch logout success', () => {
    expect(loadingReducer(generateLoadingState('logoutLoading', true), fetchLogoutSuccess()).logoutLoading)
      .toEqual(false);
  })

  it('Should update logoutLoading to false upon fetch logout failure', () => {
    expect(loadingReducer(generateLoadingState('logoutLoading', true), fetchLogoutFailure()).logoutLoading)
      .toEqual(false);
  })

  it('Should update surveyLoading to true upon fetch logout request', () => {
    expect(loadingReducer(generateLoadingState('surveyLoading', false), fetchSubmitIssuesRequest()).surveyLoading)
      .toEqual(true);
  })
  
  it('Should update surveyLoading to false upon fetch logout success', () => {
    expect(loadingReducer(generateLoadingState('surveyLoading', true), fetchSubmitIssuesSuccess(stubSubmitIssuesFetchSuccessResponse)).surveyLoading)
      .toEqual(false);
  })

  it('Should update surveyLoading to false upon fetch logout failure', () => {
    expect(loadingReducer(generateLoadingState('surveyLoading', true), fetchSubmitIssuesFailure()).surveyLoading)
      .toEqual(false);
  })
});

