import { Action } from "redux";
import { UserIssuesSelected, SurveyState } from "../reducers/types";

// Form Field Interfaces
export interface IFormFieldObject {
  form: string,
  field: string,
  type: string,
  value: string,
};

// Form Fetch Success Response Interface
export interface IFormFetchSuccessResponseObject {
  isAuth: boolean,
  firstName: string,
  lastName: string,
  userId: string,
  issuesComplete: boolean,
  surveyComplete: boolean,
  issuesSelected: UserIssuesSelected,
  questions: SurveyState,
};

// Form Field Action Interfaces
export interface IUpdateFieldAction extends Action<string> {
  formFieldObject: IFormFieldObject,
};

export interface IFormSuccessAction extends Action<string> {
  response: IFormFetchSuccessResponseObject,
}

export interface IFormFailureAction extends Action<string> {
  form: string,
  message: string,
}

// Issue Fetch Success Response Interface
export interface IIssuesFetchSuccessResponseObject {
  [issueId: string] : {
    issueBlurb: string,
    issueId: string,
    issueName: string,
  }
}

// Issues Action Interfaces
export interface IIssuesSuccessAction extends Action<string>{
  response: IIssuesFetchSuccessResponseObject,
}

export interface IIssuesFailureAction extends Action<string>{
  message: string,
}

// User Action Interfaces
export interface IToggleIssueAction extends Action<string> {
  issueId: string,
}

export interface IUpdateIssuePositionAction extends IToggleIssueAction {
  position: string,
}
