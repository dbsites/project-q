import { Action } from "redux";

export interface updateFieldAction extends Action {
  type: string,
  payload: formFieldObject,
}

export interface formFieldObject {
  form: string,
  field: string,
  type: string,
  value: string,
}
