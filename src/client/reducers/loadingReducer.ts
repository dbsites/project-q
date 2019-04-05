/**
 * @module loadingReducer
 * @description Reducer for Loading States
 * UNIT TEST COVERAGE - 100%
 */

import actions from '../actions/actionTypes';
import { LoadingState } from './types';

// Define initial state
export const initialLoadingState: LoadingState = {
  authLoading: false,
  formLoading: false,
  issuesLoading: false,
  logoutLoading: false,
  surveyLoading: false,
  stocksVisualizationLoading: false,
};

const loadingReducer = (state: LoadingState = initialLoadingState, action: any): LoadingState => {
  switch (action.type) {
    case actions.FETCH_AUTH_REQUEST:
      return {
        ...state,
        authLoading: true,
      };
      
    case actions.FETCH_AUTH_SUCCESS:
    case actions.FETCH_AUTH_FAILURE:
      return {
        ...state,
        authLoading: false,
      };

    case actions.FETCH_FORM_REQUEST:
      return {
        ...state,
        formLoading: true,
      };
      
    case actions.FETCH_FORM_SUCCESS:
    case actions.FETCH_FORM_FAILURE:
      return {
        ...state,
        formLoading: false,
      };

    case actions.FETCH_ISSUES_REQUEST:
      return {
        ...state,
        issuesLoading: true,
      };
      
    case actions.FETCH_ISSUES_SUCCESS:
    case actions.FETCH_ISSUES_FAILURE:
      return {
        ...state,
        issuesLoading: false,
      };

    case actions.FETCH_LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
      };

    case actions.FETCH_LOGOUT_SUCCESS:
    case actions.FETCH_LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
      };
      
    case actions.FETCH_SUBMIT_ISSUES_REQUEST:
      return {
        ...state,
        surveyLoading: true,
      };

    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
    case actions.FETCH_SUBMIT_ISSUES_FAILURE:
      return {
        ...state,
        surveyLoading: false,
      };

    case actions.CALC_STOCKS_VISUALIZER_PENDING:
      return {
        ...state,
        stocksVisualizationLoading: true,
      };

    case actions.CALC_STOCKS_VISUALIZER_SUCCESS:
    case actions.CALC_STOCKS_VISUALIZER_ERROR:
    case actions.CALC_STOCKS_VISUALIZER_STOP:
      return {
        ...state,
        stocksVisualizationLoading: false,
      };

    default:
      return state;
  } 
}

export default loadingReducer;