import * as React from 'react';

const SurveyQuestion = (props: any) => {

  const { questionText } = props;

  return (
    <div>
      {questionText}
    </div>
  );
};

export default SurveyQuestion;
