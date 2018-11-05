/**
 * @module issueReducer
 * @description Reducer for Issues Object
 */

import actions from '../actions/actionTypes';

// Define initial state
const initialIssueState: any = {
  issueOne: {
    name: 'issueOne',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueTwo: {
    name: 'issueTwo',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueThree: {
    name: 'issueThree',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueFour: {
    name: 'issueFour',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueFive: {
    name: 'issueFive',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueSix: {
    name: 'issueSix',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueSeven: {
    name: 'issueSeven',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueEight: {
    name: 'issueEight',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueNine: {
    name: 'issueNine',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueTen: {
    name: 'issueTen',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueEleven: {
    name: 'issueEleven',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
  issueTwelve: {
    name: 'issueTwelve',
    blurb: `Do you support or oppose this particular issue?`,
    selected: false,
  },
};

// Reducer for single issue
const issueReducer = (state: any, action: any) => {
  switch(action.type) {
    case actions.TOGGLE_ISSUE:
      if (state.name === action.payload) {
        return {
          ...state,
          selected: !state.selected,
        }
      }

    default: 
    return state
  }
}

// Reducer for all issues object
const issuesReducer = (state: any = initialIssueState, action: any) => {
  switch (action.type) {
    case actions.TOGGLE_ISSUE:
      const newState = {...state};
      newState[action.payload] = issueReducer(state[action.payload], action);
      return newState;
    case actions.CLEAR_ISSUES:
      return initialIssueState;
    default:
      return state;
  }
}

export default issuesReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns array and count of selected issues
export const getSelectedIssues = (state: any) => Object.keys(state).filter(issue => state[issue].selected);
export const getSelectedIssueCount = (state: any) => Object.keys(state).filter(issue => state[issue].selected).length;
