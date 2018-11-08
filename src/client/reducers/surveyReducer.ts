/**
 * @module surveyReducer
 * @description Reducer for Survey Object
 */

import actions from '../actions/actionTypes';
import { SurveyState, QuestionState, IssueQuestionsState } from './types';

// Define initial state
const initialSurveyState: SurveyState = {
  '0755baa6-1b5f-49c2-918a-457f1e16fe1c': {
    q1: {
      questionId: 'q1',
      question: 'Our country has made the changes needed to give black citizens equal rights with whites.',
      agree: null,
      position: 'con',
    },
    q2: {
      questionId: 'q2',
      question: 'Corporations should make both gender and ethnic diversity a priority in their hiring practices.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Gender identity should be added to existing anti-discrimination laws.',
      agree: null,
      position: 'pro',
    },
  },
  '2383b711-794f-4829-a189-25ceb32753a2': {
    q1: {
      questionId: 'q1',
      question: 'Companies should be discouraged from laying off workers strictly to increase their stock price.',
      agree: null,
      position: 'pro',
    },
    q2: {
      questionId: 'q2',
      question: 'The US government should raise the federal minimum wage, currently at $7.25 per hour.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Companies should be free to move operations offshore to lower their effective tax rate.',
      agree: null,
      position: 'pro',
    },
  },
  '30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f': {
    q1: {
      questionId: 'q1',
      question: 'The government should do more to ensure that American have access to healthcare.',
      agree: null,
      position: 'pro',
    },
    q2: {
      questionId: 'q2',
      question: 'The government should regulate the prices of life-saving drugs.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Health care plans should not be required to cover preexisting conditions.',
      agree: null,
      position: 'con',
    },
  },
  '70df714e-8566-4265-abe5-266d5a2004a9': {
    q1: {
      questionId: 'q1',
      question: 'Private gun sales and sales at gun shows should be subject to background checks.',
      agree: null,
      position: 'con',
    },
    q2: {
      questionId: 'q2',
      question: 'People on the "no-fly list" should still be allowed to purchase firearms and ammunition.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: '"Assault-style" firearms should be NOT banned in the United States.',
      agree: null,
      position: 'pro',
    },
  },
  'f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2': {
    q1: {
      questionId: 'q1',
      question: 'Marijuana should be legalized at the federal level.',
      agree: null,
      position: 'pro',
    },
    q2: {
      questionId: 'q2',
      question: 'The government should prioritize treatment over incarceration for non-violent drug offenders.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Welfare recipients should undergo mandatory drug testing.',
      agree: null,
      position: 'con',
    },
  },
  '58400255-75d9-41ad-b156-b073dbc03b0e': {
    q1: {
      questionId: 'q1',
      question: 'Corporate money has a corrosive influence on our political process.',
      agree: null,
      position: 'con',
    },
    q2: {
      questionId: 'q2',
      question: 'I\'m comfortable with money in politics, as long as the money goes to causes I support.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Corporations should be free to make unlimited contributions to candidates.',
      agree: null,
      position: 'pro',
    },
  },
  '39c3c304-4a0f-4daa-947a-85b4131b452b': {
    q1: {
      questionId: 'q1',
      question: 'Giving back to the community through volunteer work and civic development should be a goal of all corporations.',
      agree: null,
      position: 'pro',
    },
    q2: {
      questionId: 'q2',
      question: 'I value corporations who make consistent contributions to charities I believe in.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Profitable companies have no obligation to engage in charitable outreach.',
      agree: null,
      position: 'pro',
    },
  },
  '580600c8-c633-476b-98d2-9676c70c177d': {
    q1: {
      questionId: 'q1',
      question: 'Our country should do whatever it takes to protect the environment.',
      agree: null,
      position: 'pro',
    },
    q2: {
      questionId: 'q2',
      question: 'The government should give subsidies and tax credits to win and solar power companies.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Stricter environment laws and regulations are worth the cost.',
      agree: null,
      position: 'pro',
    },
  },
  'fd054069-2079-4f99-bb1c-6973eef5f3bf': {
    q1: {
      questionId: 'q1',
      question: 'The growing number of newcomers from other countries threatens traditional American customs and values.',
      agree: null,
      position: 'con',
    },
    q2: {
      questionId: 'q2',
      question: 'Sanctuary cities should not receive federal funding.',
      agree: null,
      position: 'con',
    },
    q3: {
      questionId: 'q3',
      question: 'The U.S. government should build a wall along the southern border with Mexico.',
      agree: null,
      position: 'con',
    },
  },
  '9c82b608-f919-4f58-a23d-4e7a4528c146': {
    q1: {
      questionId: 'q1',
      question: 'Executive Compensation should be tied to overall performance.',
      agree: null,
      position: 'pro',
    },
    q2: {
      questionId: 'q2',
      question: 'Generally, salary gaps between executives and average workers are too high.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: 'Employee satisfaction is important to me when choosing companies to invest in.',
      agree: null,
      position: 'pro',
    },
  },
  'bc5536d2-45a4-4093-9dc6-529589c56e49': {
    q1: {
      questionId: 'q1',
      question: 'Lowering taxes on the wealthiest Americans promotes job creation and economic development.',
      agree: null,
      position: 'con',
    },
    q2: {
      questionId: 'q2',
      question: 'The US government should not make cuts to public spending in order to reduce the national debt.',
      agree: null,
      position: 'con',
    },
    q3: {
      questionId: 'q3',
      question: 'The government should decrease the tax rate on profits earned from the sale of stocks, bonds and real estate.',
      agree: null,
      position: 'con',
    },
  },
  '7d9dc278-a6dc-4701-8b23-448ae3000cbb': {
    q1: {
      questionId: 'q1',
      question: 'I view legislation enacted by our current administration favorably.',
      agree: null,
      position: 'pro',
    },
    q2: {
      questionId: 'q2',
      question: 'I have a positive view of corporations who have given money to our incumbent president.',
      agree: null,
      position: 'pro',
    },
    q3: {
      questionId: 'q3',
      question: '"America First" is a winning philosophy for our country.',
      agree: null,
      position: 'pro',
    },
  },
};

// Reducer for single question
const questionReducer = (state: QuestionState, action: any): QuestionState => {
  switch(action.type) {
    case actions.ANSWER_QUESTION:
      if (state.questionId === action.payload.questionId) {
        return {
          ...state,
          agree: action.payload.agree,
        }
      }

    default: 
    return state
  }
}

// Reducer for all questions
const questionsReducer = (state: IssueQuestionsState, action: any): IssueQuestionsState => {
  switch(action.type) {
    case actions.ANSWER_QUESTION:
      const question: string = action.payload.questionId;
      const nextState: IssueQuestionsState = {};
      nextState[question] = questionReducer(state[question], action);
      return {
        ...state,
        ...nextState,
      }

    default: 
    return state
  }
}

// Reducer for whole survey
const surveyReducer = (state: SurveyState = initialSurveyState, action: any): SurveyState => {
  switch(action.type) {
    case actions.ANSWER_QUESTION:
      const issue: string = action.payload.issueId;
      let nextState: SurveyState = {};
      nextState[issue] = questionsReducer(state[issue], action)
      return {
        ...state,
        ...nextState
      }
    
    case actions.CLEAR_QUESTIONS:
      const clearState: SurveyState = {};
      clearState[action.payload] = initialSurveyState[action.payload]
      return {
        ...state,
        ...clearState,
      }

    case actions.FETCH_FORM_SUCCESS:
    case actions.FETCH_SUBMIT_ISSUES_SUCCESS:
      const newState: any = {};
      const questionIdArray = Object.keys(action.response.questions);
      questionIdArray.forEach((questionId) => {
        const issueId = action.response.questions[questionId].issueId;
        if (!newState[issueId]) newState[issueId] = {};
        newState[issueId][questionId] = {
          questionId: questionId,
          question: action.response.questions[questionId].questionText,
          agree: null,
          position: action.response.questions[questionId].position,
        }
      });
      return newState;

    default: 
    return state;
  }
}

export default surveyReducer;

// -- SELECTOR FUNCTIONS -- //
// Return survey question IDs
export const getQuestionIdList = (state: SurveyState, issueId: string): string[] => Object.keys(state[issueId]);
// Return survey questions object
export const getQuestionsObject = (state: SurveyState, issueId: string): IssueQuestionsState => state[issueId];
// Return count of questions whose answers are still null
export const getOutstandingQuestionsCount = (state: SurveyState, issueId: string): number => {
    const questionsObject = getQuestionsObject(state, issueId);
    let outstandingQuestions = Object.keys(questionsObject).filter(q => questionsObject[q].agree === null);
    return outstandingQuestions.length;
  };
// Return overall issue position once user has answered three survey questions
export const getPosition = (state: SurveyState, issueId: string): string => {
  let proScore: number = 0;
  const questionIdList = getQuestionIdList(state, issueId);
  const questionsObject = getQuestionsObject(state, issueId);
  questionIdList.forEach((questionId) => {
    if (questionsObject[questionId].agree && questionsObject[questionId].position === 'pro') proScore += 1;
    if (!questionsObject[questionId].agree && questionsObject[questionId].position === 'con') proScore += 1;
  })
  switch(proScore) {
    case 3:
      return 'strong pro';
    case 2:
      return 'pro';
    case 1:
      return 'con';
    default:
      return 'strong con';
  }
};
