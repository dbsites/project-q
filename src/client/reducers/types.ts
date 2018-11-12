// Issue(s) Object Types
export interface IssueState {
  readonly name: string,
  readonly blurb: string,
  readonly selected: boolean,
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
};

export interface RegisterState {
  readonly firstName: string,
  readonly lastName: string,
  readonly registerEmail: string,
  readonly emailValid: boolean,
  readonly registerPassword: string,
  readonly confirmPassword: string,
  readonly agreeTerms: boolean,
};

export interface FormState {
  readonly login: LoginState,
  readonly register: RegisterState,
}

// Survey Object Types
export interface QuestionState {
  readonly questionId: string,
  readonly question: string,
  readonly agree: boolean | null,
  readonly position: string,
};

export interface IssueQuestionsState {
  [name: string]: QuestionState,
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
export interface UserIssues {
  [name: string]: boolean | null,
};

export interface UserState {
  readonly userId: string | null,
  readonly isAuth: boolean | null,
  readonly issues: UserIssues,
  readonly issuesComplete: boolean | null,
  readonly firstName: string | null,
  readonly lastName: string | null,
  readonly surveyComplete: boolean | null,
  readonly surveyPage: number,
};

// TODO: will update to appropriate types (GM)
export interface CompanyState {
  readonly selectedCompany: any
  readonly companyList: any
}

export interface ApplicationState {
  readonly issues: IssuesState,
  readonly form: FormState,
  readonly survey: SurveyState,
  readonly user: UserState,
  readonly company: CompanyState,
};
