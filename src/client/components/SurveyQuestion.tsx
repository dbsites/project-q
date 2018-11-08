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
    agreeButton = <input className="survey-button survey-agree-button" onClick={() => callAnswerQuestion(true)} type="submit" value="Agree" />;
    disagreeButton = <input className="survey-button survey-disagree-button" onClick={() => callAnswerQuestion(false)} type="submit" value="Disagree" />;
  } else if (questionAgree) {
    agreeButton = <input className="survey-button survey-agree-button survey-agreed" type="submit" value="Agree" />;
    disagreeButton = <input className="survey-button survey-disagree-button survey-deselected-button" onClick={() => callAnswerQuestion(false)} type="submit" value="Disagree" />;
  } else {
    agreeButton = <input className="survey-button survey-agree-button survey-deselected-button" onClick={() => callAnswerQuestion(true)} type="submit" value="Agree" />;
    disagreeButton = <input className="survey-button survey-disagree-button" type="submit" value="Disagree" />;
  }

  return (
    <div className='survey-question'>
      <div className="survey-question-box">
        <span className="survey-question-text">{questionText}</span>
        {agreeButton}
        {disagreeButton}
      </div>
    </div>
  );
};

export default SurveyQuestion;
