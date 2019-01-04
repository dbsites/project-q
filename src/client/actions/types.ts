import { Action } from "redux";
import { UserIssuesSelected, SurveyState } from "../reducers/types";

// Device Action Interfaces
export interface ISetDeviceAction extends Action<string> {
  deviceType: string,
}

// Modal Action Interfaces
export interface ISetModalAction extends Action<string> {
  modalType: string,
}

// Fetch Failure Interface
export interface IFetchFailureAction extends Action<string> {
  message: string,
}

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

export interface IFormFailureAction extends IFetchFailureAction {
  form: string,
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

// User Action Interfaces
export interface IToggleIssueAction extends Action<string> {
  issueId: string,
}

export interface IUpdateIssuePositionAction extends IToggleIssueAction {
  position: string,
}

export interface INoAuthObject {
  isAuth: boolean,
}

export interface IAuthSuccessAction extends Action<string> {
  response: IFormFetchSuccessResponseObject,
}

// Survey Action Interfaces
export interface ISubmitIssuesSuccessAction extends Action<string>{
  response: SurveyState,
}