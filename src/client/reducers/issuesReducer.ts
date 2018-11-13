/**
 * @module issueReducer
 * @description Reducer for Issues Object
 */

import actions from '../actions/actionTypes';
import { IssuesState, IssueState } from './types';

// Define initial state
const initialIssuesState: IssuesState = {};

// Reducer for single issue
// TODO: Explicit Action Type
const issueReducer = (state: IssueState, action: any, issueId: string): IssueState => {
  switch(action.type) {
    case actions.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        issueId: issueId,
        name: action.response[issueId].issueName,
        blurb: action.response[issueId].issueBlurb,
      }
    
    default: 
    return state
  }
}

// Reducer for all issues object
// TODO: Explicit Action Type
const issuesReducer = (state: IssuesState = initialIssuesState, action: any): IssuesState => {
  const nextState: IssuesState = {};
  switch (action.type) {
    case actions.FETCH_ISSUES_SUCCESS:
      const issueIdArray = Object.keys(action.response);
      issueIdArray.forEach((issueId) => {
        if (state[issueId]) {
          nextState[issueId] = issueReducer(state[issueId], action, issueId);
        } else {
          nextState[issueId] = issueReducer({} as IssueState, action, issueId);
        }
      })
      return {
        ...nextState,
      };
      
    default:
      return state;
  }
}

export default issuesReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns array and count of selected issues
export const getIssueName = (state: IssuesState, issueId: string): string => state[issueId].name;
