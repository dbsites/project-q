/**
 * @module RegisterForm.tsx
 * @description User Survey Presentation Component
 */

import * as React from 'react';

import SurveyButtons from './SurveyButtons';

const SurveyQuestion = (props: any) => {

  const { answerQuestion, issueId, questionId, questionAgree, questionText } = props;

  return (
    <div className="survey-question-box">
      <span className="survey-question-text">{questionText}</span>
      <div className="survey-question-hr"><hr /></div>
      <SurveyButtons 
        answerQuestion={answerQuestion}
        issueId={issueId}
        questionId={questionId}
        questionAgree={questionAgree}
      />
    </div>
  );
};

export default SurveyQuestion;
