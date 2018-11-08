/**
 * @module RegisterForm.tsx
 * @description User Survey Presentation Component
 */

 import * as React from 'react';
import { AnswerPayload } from '../reducers/types';

const SurveyQuestion = (props: any) => {

  const { answerQuestion, issueId, questionId, questionAgree, questionText } = props;
  
  let agreeButton;
  let disagreeButton;

  // Helper question that generates payload object
  const callAnswerQuestion = (agreeVal: boolean): void => {
    const payload: AnswerPayload = {
      agree: agreeVal,
      issueId: issueId,
      questionId: questionId,
    }
    answerQuestion(payload);
  }

  if (questionAgree === null) {
    agreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(true)}>Agree</div>;
    disagreeButton = <div className="survey-button" onClick={() => callAnswerQuestion(false)} >Disagree</div>;
  } else if (questionAgree) {
    agreeButton = <div className="survey-button survey-agreed" >Agree</div>;
    disagreeButton = <div className="survey-button survey-deselected-button" onClick={() => callAnswerQuestion(false)} >Disagree</div>;
  } else {
    agreeButton = <div className="survey-button survey-deselected-button" onClick={() => callAnswerQuestion(true)} >Agree</div>;
    disagreeButton = <div className="survey-button survey-disagreed" >Disagree</div>;
  }

  return (
    <div className="survey-question-box">
      <span className="survey-question-text">{questionText}</span>
      <div className="survey-question-hr"><hr /></div>
      <div className="survey-question-buttons">
        {agreeButton}
        {disagreeButton}
      </div>
    </div>
  );
};

export default SurveyQuestion;
