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
  readonly questionText: string,
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
export interface UserIssuesSelected {
  [name: string]: boolean | null,
};

export interface UserState {
  readonly userId: string | null,
  readonly isAuth: boolean | null,
  readonly issuesSelected: UserIssuesSelected,
  readonly issuesComplete: boolean | null,
  readonly firstName: string | null,
  readonly lastName: string | null,
  readonly surveyComplete: boolean | null,
  readonly surveyPage: number,
};

export interface LoadingState {
  readonly authLoading: boolean,
  readonly issuesLoading: boolean,
  readonly surveyLoading: boolean,
}

//***************************** */

export interface CompanyState {
  readonly full_name: string | null
  readonly short_name: string | null
  readonly ticker: string | null
  readonly description: string | null
  readonly yearFounded: number | null
  readonly numberEmployees: number | null
  readonly url: number | null
  readonly logo: string | null
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

//***************************** */
export interface ApplicationState {
  readonly company: CompanyState,
  readonly form: FormState,
  readonly issues: IssuesState,
  readonly loading: LoadingState,
  readonly survey: SurveyState,
  readonly user: UserState,
};

