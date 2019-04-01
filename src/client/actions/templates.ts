/**
 * @module templates.ts
 * @description Templates for Testing and Alignment
 */

// Import Random ID generator
import { v4 } from 'uuid';
import { IFormFieldObject, IFormFetchSuccessResponseObject, IIssuesFetchSuccessResponseObject, INoAuthObject } from './types';
import { LoginState, SurveyState, UserIssuesSelected } from '../reducers/types';

// Stub device type
export const stubDeviceType: string = 'mobile';

// Stub modal type
export const stubModalType: string = 'reset';

// Stubs for Updating Forms (and Auth)
export const stubUserId: string = v4();
export const stubFormName: string = 'login';
export const stubErrorMessage: string = 'Something has gone wrong - please try again';

export const stubFormFieldObject: IFormFieldObject = {
  form: stubFormName,
  field: 'loginEmail',
  type: 'text',
  value: 'test@test.com',
};

export const stubFormFetchRequestBody: LoginState = { 
  loginEmail: 'test@test.com',
  emailValid: true,
  loginPassword: 's3cretp@ss',
  rememberMe: true,
  loginError: '',
};

export const stubFormFetchSuccessResponse: IFormFetchSuccessResponseObject = {
  isAuth: true,
  firstName: 'test',
  lastName: 'test',
  userId: v4(),
  issuesComplete: false,
  surveyComplete: false,
  issuesSelected: {},
  questions: {},
};

export const stubNoAuthFetchResponse: INoAuthObject = { isAuth: false }

export const stubFormFetchErrorMessage: string = 'Invalid email address or password';

// Stubs for Updating Issues
export const stubIssueId: string = v4();
export const stubPosition: string = 'strong pro';

export const stubIssuesFetchSuccessResponse: IIssuesFetchSuccessResponseObject = {
  '580600c8-c633-476b-98d2-9676c70c177d': {
    issueId: '580600c8-c633-476b-98d2-9676c70c177d',
    issueName: 'Environment',
    issueBlurb: 'Lorem ipsum dolor sit amet',
  }
};
export const stubIssueFetchErrorMessage: string = 'Something has gone wrong - please try again';

// Stubs for Submitting Issues
export const stubSubmitIssuesFetchRequest: UserIssuesSelected = {
  '580600c8-c633-476b-98d2-9676c70c177d': {position: null, weight: 5}
};

export const stubSubmitIssuesFetchSuccessResponse: SurveyState = {
  '580600c8-c633-476b-98d2-9676c70c177d': {
    '7d2144fc-225b-4e5c-9d56-a0ecd4bbf8a0': {
      agree: null,
      position: 'pro',
      questionId: '7d2144fc-225b-4e5c-9d56-a0ecd4bbf8a0',
      questionText: 'Sample Question Text',
    }
  },
};