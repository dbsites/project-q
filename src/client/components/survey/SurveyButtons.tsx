/**
 * @module SurveyButtons.tsx
 * @description Survey Question Agree/Disagree Buttons
 */

import * as React from 'react';

import { AnswerPayload } from '../../reducers/types';

interface SurveyButtonProps {
  answerQuestion: any, // TODO: Specify
  issueId: string,
  questionAgree: boolean | null,
  questionId: string,
}

const SurveyButtons = (props: SurveyButtonProps) => {
  // Destructure Props
  const {answerQuestion, issueId, questionAgree, questionId } = props;

  // Helper question that generates payload object
  const callAnswerQuestion = (agreeVal: boolean): any => {
    const payload: AnswerPayload = {
      agree: agreeVal,
      issueId: issueId,
      questionId: questionId,
    }
    return answerQuestion(payload);
  }

  let agreeButton: JSX.Element;
  let disagreeButton: JSX.Element;

  if (questionAgree === null) {
    agreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(true)}>Agree</div>;
    disagreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(false)} >Disagree</div>;
  } else if (questionAgree) {
    agreeButton = <div className="survey-button survey-selected" >Agree</div>;
    disagreeButton = <div className="survey-button survey-deselected" onClick={() => callAnswerQuestion(false)} >Disagree</div>;
  } else {
    agreeButton = <div className="survey-button survey-deselected" onClick={() => callAnswerQuestion(true)} >Agree</div>;
    disagreeButton = <div className="survey-button survey-selected" >Disagree</div>;
  }

  return (
    <div className="survey-question-buttons">
      {disagreeButton}
      {agreeButton}
    </div>
  )
}

export default SurveyButtons;
