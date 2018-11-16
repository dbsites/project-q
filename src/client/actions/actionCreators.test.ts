// Import Action Creators for testing
import * as actions from './actionCreators';

// Import Redux Types
import { Action } from 'redux';

// Import Action Types and Interfaces
import types from './actionTypes'
import { IToggleIssueAction, IFormFieldObject, IUpdateFieldAction, IFormFailureAction } from './types';

// Import Random ID generation
import { v4 } from 'uuid';

describe('Function Test: Synchronous Action Creators', () => {
  describe('Feature: Form Action Creators', () => {
    it('updateField, given a form field object, returns an action to update that form field', () => {
      const formFieldObject: IFormFieldObject = {
        form: 'login',
        field: 'loginEmail',
        type: 'text',
        value: 'test@test.com',
      }
      const expectedAction: IUpdateFieldAction = {
        type: types.UPDATE_FIELD,
        formFieldObject,
      }
      expect(actions.updateField(formFieldObject)).toEqual(expectedAction);
    })
    it('fetchFormFailure, given a form and message, returns an action to update that form\'s error message', () => {
      const form: string = 'login';
      const message: string = 'Please enter a valid email address';
      const expectedAction: IFormFailureAction = {
        type: types.FETCH_FORM_FAILURE,
        form,
        message,
      }
      expect(actions.fetchFormFailure(form, message)).toEqual(expectedAction);
    })
  })

  describe('Feature: User Action Creators', () => {
    it('clearIssues returns an action to clear all issues', () => {
      const expectedAction: Action<string> = {
        type: types.CLEAR_ISSUES,
      };
      expect(actions.clearIssues()).toEqual(expectedAction);
    });
    it('addIssue, given an issueId, returns an action to add that issue', () => {
      const issueId: string = v4();
      const expectedAction: IToggleIssueAction = {
        type: types.ADD_ISSUE,
        issueId,
      };
      expect(actions.addIssue(issueId)).toEqual(expectedAction);
    });    
    it('removeIssue, given an issueId, returns an action to remove that issue', () => {
      const issueId: string = v4();
      const expectedAction: IToggleIssueAction = {
        type: types.REMOVE_ISSUE,
        issueId,
      }
      expect(actions.removeIssue(issueId)).toEqual(expectedAction);
    });
    it('updateIssuesSelected returns an action to reselect issues', () => {
      const expectedAction: Action<string> = {
        type: types.UPDATE_ISSUES_SELECTED,
      }
      expect(actions.updateIssuesSelected()).toEqual(expectedAction);
    });
    it('updateIssuePosition, given an issueId and position, returns an action to update the user position on that issue', () => {
      const issueId: string = v4();
      const position: string = 'strong pro';
      const expectedAction: any = {
        type: types.UPDATE_ISSUE_POSITION,
        issueId,
        position,
      };
      expect(actions.updateIssuePosition(issueId, position)).toEqual(expectedAction);
    })
  })
});
