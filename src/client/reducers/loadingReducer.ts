/**
 * @module loadingReducer
 * @description Reducer for Loading States
 */

import actions from '../actions/actionTypes';
import { LoadingState } from './types';

// Define initial state
const initialLoadingState: LoadingState = {
  authLoading: false,
  issuesLoading: false
};

const loadingReducer = (state: LoadingState = initialLoadingState, action: any): LoadingState => {
  switch (action.type) {
    case actions.FETCH_AUTH_REQUEST:
      return {
        ...state,
        authLoading: true
      };

    case actions.FETCH_ISSUES_REQUEST:
      return {
        ...state,
        issuesLoading: true
      };

    case actions.FETCH_AUTH_SUCCESS:
      return {
        ...state,
        authLoading: false
      };


    case actions.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        issuesLoading: false
      };

    default:
      return state;
  } 
}

export default loadingReducer;