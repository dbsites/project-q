// Import Action Creators for testing
import * as actions from './actionCreators';

// Import Redux Types
import { Action } from 'redux';

// Import Action Types and Interfaces
import types from './actionTypes'
import { toggleIssueAction } from './types';

// Import Random ID generation
import { v4 } from 'uuid';

describe('Function Test: Synchronous Action Creators', () => {
  describe('Feature: Form Action Creators', () => {
    it('Given a form field object, updateField returns an action to update that form field', () => {
      
    })
  })

  describe('Feature: Issue Ranking Action Creators', () => {
    it('Given an issueId, addIssue returns an action to add that issue', () => {
      const issueId: string = v4();
      const expectedAction: toggleIssueAction = {
        type: types.ADD_ISSUE,
        issueId,
      }
      expect(actions.addIssue(issueId)).toEqual(expectedAction);
    });    
    it('Given an issueId, removeIssue returns an action to remove that issue', () => {
      const issueId: string = v4();
      const expectedAction: toggleIssueAction = {
        type: types.REMOVE_ISSUE,
        issueId,
      }
      expect(actions.removeIssue(issueId)).toEqual(expectedAction);
    });
    it('clearIssues returns an action to clear all issues', () => {
      const expectedAction: Action<string> = {
        type: types.CLEAR_ISSUES,
      }
      expect(actions.clearIssues()).toEqual(expectedAction);
    });
  })
});
