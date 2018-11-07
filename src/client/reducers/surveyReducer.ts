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
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '2383b711-794f-4829-a189-25ceb32753a2': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '70df714e-8566-4265-abe5-266d5a2004a9': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  'f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '58400255-75d9-41ad-b156-b073dbc03b0e': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '39c3c304-4a0f-4daa-947a-85b4131b452b': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '580600c8-c633-476b-98d2-9676c70c177d': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  'fd054069-2079-4f99-bb1c-6973eef5f3bf': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '9c82b608-f919-4f58-a23d-4e7a4528c146': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  'bc5536d2-45a4-4093-9dc6-529589c56e49': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
  '7d9dc278-a6dc-4701-8b23-448ae3000cbb': {
    q1: {
      qid: 'q1',
      question: 'How would you answer this first survey question?',
      answer: null,
    },
    q2: {
      qid: 'q2',
      question: 'How would you answer this second survey question?',
      answer: null,
    },
    q3: {
      qid: 'q3',
      question: 'How would you answer this third survey question?',
      answer: null,
    },
  },
};

// Reducer for single question
const questionReducer = (state: QuestionState, action: any): QuestionState => {
  switch(action.type) {
    case actions.ANSWER_QUESTION:
      if (state.qid === action.payload.target.id) {
        return {
          ...state,
          answer: action.payload.target.value.toLowerCase(),
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
      const question: string = action.payload.target.id;
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
      const issue: string = action.payload.target.title;
      const nextState: SurveyState = {};
      nextState[issue] = questionsReducer(state[issue], action)
      return {
        ...state,
        ...nextState
      }

    default: 
    return state
  }
}

export default surveyReducer;

// -- SELECTOR FUNCTIONS -- //
// Returns survey questions
export const getQuestionsList = (state: SurveyState, issueId: string): string[] => Object.keys(state[issueId]);
export const getQuestionsObject = (state: SurveyState, issueId: string): IssueQuestionsState => state[issueId];