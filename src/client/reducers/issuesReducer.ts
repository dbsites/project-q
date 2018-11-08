/**
 * @module issueReducer
 * @description Reducer for Issues Object
 */

import actions from '../actions/actionTypes';
import { IssuesState, IssueState } from './types';

// Define initial state
const initialIssuesState: IssuesState = {
  '0755baa6-1b5f-49c2-918a-457f1e16fe1c': {
    name: 'Civil/Women\'s Rights',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '2383b711-794f-4829-a189-25ceb32753a2': {
    name: 'Economy and Jobs',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f': {
    name: 'Health Care',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '70df714e-8566-4265-abe5-266d5a2004a9': {
    name: '2nd Amendment',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  'f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2': {
    name: 'Drug Legalization',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '58400255-75d9-41ad-b156-b073dbc03b0e': {
    name: 'Corporate Philanthropy',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '39c3c304-4a0f-4daa-947a-85b4131b452b': {
    name: 'Money and Politics',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '580600c8-c633-476b-98d2-9676c70c177d': {
    name: 'Environment',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  'fd054069-2079-4f99-bb1c-6973eef5f3bf': {
    name: 'Immigration',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '9c82b608-f919-4f58-a23d-4e7a4528c146': {
    name: 'Salary Gap / Wages',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  'bc5536d2-45a4-4093-9dc6-529589c56e49': {
    name: 'Taxes',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  '7d9dc278-a6dc-4701-8b23-448ae3000cbb': {
    name: 'Presidential Support',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
};

// Reducer for single issue
// TODO: Explicit Action Type
const issueReducer = (state: IssueState, action: any): IssueState => {
  switch(action.type) {
    case actions.TOGGLE_ISSUE:
      return {
        ...state,
        selected: !state.selected,
      }

    default: 
    return state
  }
}

// Reducer for all issues object
// TODO: Explicit Action Type
const issuesReducer = (state: IssuesState = initialIssuesState, action: any): IssuesState => {
  switch (action.type) {
    case actions.TOGGLE_ISSUE:
      const newState: IssuesState = {...state};
      newState[action.payload] = issueReducer(state[action.payload], action);
      return newState;
    case actions.CLEAR_ISSUES:
      return initialIssuesState;
    default:
      return state;
  }
}

export default issuesReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns array and count of selected issues
export const getSelectedIssues = (state: IssuesState): string[] => Object.keys(state).filter(issue => state[issue].selected);
export const getSelectedIssueCount = (state: IssuesState): number => Object.keys(state).filter(issue => state[issue].selected).length;
export const getIssueName = (state: IssuesState, issueId: string): string => state[issueId].name;
