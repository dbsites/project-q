import * as React from 'react';

const SurveyQuestion = (props: any) => {

  const { answerQuestion, issue, question, questionAnswer, questionNumber, questionText } = props;
  
  let agreeButton;
  let disagreeButton;

  if (!questionAnswer) {
    agreeButton = <input className="survey-button survey-agree-button" id={question} onClick={answerQuestion} title={issue} type="submit" value="Agree" />;
    disagreeButton = <input className="survey-button survey-disagree-button" id={question} onClick={answerQuestion} title={issue} type="submit" value="Disagree" />;
  } else if (questionAnswer === 'agree') {
    agreeButton = <input className="survey-button survey-agree-button" id={question} onClick={answerQuestion} title={issue} type="submit" value="Agree" />;
    disagreeButton = <input className="survey-button survey-deselected-button" id={question} onClick={answerQuestion} title={issue} type="submit" value="Disagree" />;
  } else {
    agreeButton = <input className="survey-button survey-deselected-button" id={question} onClick={answerQuestion} title={issue} type="submit" value="Agree" />;
    disagreeButton = <input className="survey-button survey-disagree-button" id={question} onClick={answerQuestion} title={issue} type="submit" value="Disagree" />;
  }

  return (
    <div className='survey-question'>
      <span className="survey-question-text">Question {questionNumber}: {questionText}</span>
      {agreeButton}
      {disagreeButton}
    </div>
  );
};

export default SurveyQuestion;
