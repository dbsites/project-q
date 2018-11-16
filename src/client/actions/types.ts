import { Action } from "redux";

// Form Interfaces
export interface IFormFieldObject {
  form: string,
  field: string,
  type: string,
  value: string,
};

// Form Field Action
export interface IUpdateFieldAction extends Action<string> {
  formFieldObject: IFormFieldObject,
};

export interface IFormFailureAction extends Action<string> {
  form: string,
  message: string,
}

// User Actions
export interface IToggleIssueAction extends Action<string> {
  issueId: string,
}

export interface IUpdateIssuePositionAction extends IToggleIssueAction {
  position: string,
}
