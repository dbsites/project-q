import { Action } from "redux";

export interface formFieldObject {
  form: string,
  field: string,
  type: string,
  value: string,
};

// Issues - Update Selected Issue Actions
export interface toggleIssueAction extends Action<string> {
  issueId: string,
}

// Form - Update Form Field Action
export interface updateFieldAction extends Action {
  type: string,
  payload: formFieldObject,
};

