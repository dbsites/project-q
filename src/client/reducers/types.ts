// Issue(s) Object Types
export interface IssueState {
  readonly issueId: string,
  readonly name: string,
  readonly blurb: string,
};

export interface IssuesState {
  [issueId: string]: IssueState,
};

// Form Types
export interface LoginState {
  readonly loginEmail: string,
  readonly emailValid: boolean,
  readonly loginPassword: string,
  readonly rememberMe: boolean,
  readonly loginError: string,
};

export interface RegisterState {
  readonly firstName: string,
  readonly lastName: string,
  readonly registerEmail: string,
  readonly emailValid: boolean,
  readonly registerPassword: string,
  readonly confirmPassword: string,
  readonly agreeTerms: boolean,
  readonly registerError: string,
};

export interface ForgotPassState {
  forgotPassEmail: string,
  emailValid: boolean,
  forgotError: string,
}

export interface ResetPassState {
  newPassword: string,
  confirmNewPassword: string,
  resetId: string,
  resetError: string,
}

export interface FormState {
  readonly login: LoginState,
  readonly register: RegisterState,
  readonly forgot: ForgotPassState,
  readonly reset: ResetPassState,
}

// Survey Object Types
export interface QuestionState {
  readonly questionId: string,
  readonly questionText: string,
  readonly agree: boolean | null,
  readonly position: string,
};

export interface IssueQuestionsState {
  [questionId: string]: QuestionState,
};

export interface SurveyState {
  [issueId: string]: IssueQuestionsState,
};

export interface AnswerPayload {
  agree: boolean,
  issueId: string,
  questionId: string,
}

// User Object Types
export interface UserIssuesSelected {
  [name: string]: boolean | null,
};

export interface UserState {
  readonly userId: string | null,
  readonly isAdmin: boolean,
  readonly isAuth: boolean | null,
  readonly issuesSelected: UserIssuesSelected,
  readonly issuesComplete: boolean | null,
  readonly firstName: string | null,
  readonly lastName: string | null,
  readonly onboardComplete: boolean | null,
  readonly surveyComplete: boolean | null,
  readonly surveyPage: number,
};

export interface LoadingState {
  [nameLoading: string]: boolean,
}

export interface ModalState {
  isModalActive: boolean,
  modalType: string | null,
}

export interface DeviceState {
  deviceType: string | null,
}

//***************************** */

export interface QuadsProps {
  readonly selectedCompany: CompanyState | null
  selectedCompanyData: any
  companyList: any
  userIssues: any
  issueAbbrvs: any
  fetchCompanyList: any
  sortCompanyList: any
  selectCompany: any
  getUserIssues: any
  getCompanyInfo: any
}

export interface IssueScore {
  readonly agreeScore: number
  readonly disagreeScore: number
  readonly alignedScore?: number
}

export interface CompanyState {
  readonly full_name: string | null
  readonly short_name: string | null
  readonly ticker: string | null
  readonly description: string | null
  readonly yearFounded: number | null
  readonly numberEmployees: number | null
  readonly url: number | null
  readonly logo: string | null
  readonly "2nd Amendment": IssueScore
  readonly "Civil/Women's Rights": IssueScore
  readonly "Corporate Philanthropy": IssueScore
  readonly "Drug Legalization": IssueScore
  readonly "Economy and Jobs": IssueScore
  readonly "Environment": IssueScore
  readonly "Executive Compensation": IssueScore
  readonly "Health Care": IssueScore
  readonly "Immigration": IssueScore
  readonly "Money and Politics": IssueScore
  readonly "Presidential Support": IssueScore
  readonly "Taxes": IssueScore
}

export interface CompanyListState {
  [serializedNumber: number]: CompanyState
}

export interface UserIssuesState {
  [issueID: string]: string
}

export interface IssueAbbrvsState {
  [issueName: string]: string
}

export interface CompanyDataState {
  readonly selectedCompany: CompanyState | null
  readonly companyList: CompanyListState
  readonly userIssues: UserIssuesState
  readonly issueAbbrvs: IssueAbbrvsState
}

// interface CompanyInfo {
//   readonly description: string,
//   readonly overallScore: number,
//   readonly logo: string,
//   readonly ticker: string,
//   readonly name: string,
//   readonly yearFounded: number,
//   readonly numberEmployees: number,
//   readonly full_name: string,
//   readonly url: string
// }

// interface SelectedCompany {
//   readonly selected: CompanyInfo
// }

//***************************** */
export interface ApplicationState {
  readonly company: CompanyState,
  readonly device: DeviceState,
  readonly form: FormState,
  readonly issues: IssuesState,
  readonly loading: LoadingState,
  readonly survey: SurveyState,
  readonly user: UserState,
};

