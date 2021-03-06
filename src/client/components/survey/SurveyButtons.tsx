/**
 * @module SurveyButtons.tsx
 * @description Survey Question Agree/Unsure/Disagree Buttons
 */

import * as React from 'react';

import { AnswerPayload } from '../../reducers/types';

interface SurveyButtonProps {
  answerQuestion: any, // TODO: Specify
  issueId: string,
  questionAgree: boolean | null,
  questionId: string,
}

export const AGREE = true;
export const DISAGREE = false;
export const UNSURE = undefined;
export const UNCLIKED = null;

const SurveyButtons = (props: SurveyButtonProps) => {
  // Destructure Props
  const {answerQuestion, issueId, questionAgree, questionId } = props;

  // Helper question that generates payload object
  const callAnswerQuestion = (agreeVal: any): any => {
    const payload: AnswerPayload = {
      agree: agreeVal,
      issueId: issueId,
      questionId: questionId,
    }
    return answerQuestion(payload);
  }

  let agreeButton: JSX.Element;
  let unsureButton: JSX.Element;
  let disagreeButton: JSX.Element;

  if (questionAgree === UNCLIKED) {
    agreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(AGREE)}>Agree</div>;
    unsureButton = <div className="survey-button" onClick={() => callAnswerQuestion(UNSURE)}>Unsure</div>;
    disagreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(DISAGREE)} >Disagree</div>;
  } else if (questionAgree === UNSURE) {
    agreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(AGREE)}>Agree</div>;
    unsureButton = <div className="survey-button survey-selected" >Unsure</div>;
    disagreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(DISAGREE)} >Disagree</div>;
  } else if (questionAgree === AGREE) {
    agreeButton = <div className="survey-button survey-selected" >Agree</div>;
    unsureButton = <div className="survey-button" onClick={() => callAnswerQuestion(UNSURE)} >Unsure</div>;
    disagreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(DISAGREE)} >Disagree</div>;
  } else {
    // if DISAGREE
    agreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(AGREE)} >Agree</div>;
    unsureButton = <div className="survey-button" onClick={() => callAnswerQuestion(UNSURE)} >Unsure</div>;
    disagreeButton = <div className="survey-button survey-selected" >Disagree</div>;
  }

  return (
    <div className="survey-question-buttons">
      {disagreeButton}
      {unsureButton}
      {agreeButton}
    </div>
  )
}

export default SurveyButtons;
