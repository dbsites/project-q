// Issue(s) Object Types
export interface IssueState {
  readonly name: string,
  readonly blurb: string,
  readonly selected: boolean,
};

export interface IssuesState {
  [name: string]: IssueState,
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
  readonly qid: string,
  readonly question: string,
  readonly answer: string | null,
};

export interface IssueQuestionsState {
  [name: string]: QuestionState,
};

export interface SurveyState {
  [name: string]: IssueQuestionsState,
};

// User Object Types
export interface UserIssues {
  [name: string]: boolean | null,
};

export interface UserState {
  readonly userId: string | null,
  readonly isAuth: boolean | null,
  readonly issues: UserIssues,
  readonly surveyComplete: boolean,
};

export interface ApplicationState {
  readonly issues: IssuesState,
  // readonly login: LoginState,
  // readonly register: RegisterState,
  readonly form: FormState,
  readonly survey: SurveyState,
  readonly user: UserState,
};
