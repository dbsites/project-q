/**
 * @module SurveyPage.tsx
 * @description Survey Page Presentation Component
 */

import * as React from 'react';
import Header from '../containers/HeaderContainer'

const SurveyPage = (props: any) => {
  const { headerText, surveyArray, leftButton, rightButton, footerBar } = props;
  return (
    <div className="main-dashboard">
      <div className="header">
        <Header />
      </div>
      <div className="dashboard-header">
        {headerText}
      </div>
      <div className="survey-dashboard-container">
        <div className="dashboard-side">
          {leftButton}
        </div>
        <div className="survey-dashboard-question-container">{surveyArray}</div>
        <div className="dashboard-side">
          {rightButton}
        </div>
      </div>
      <div className="dashboard-footer">
        {footerBar}
      </div>
    </div>
  );
};

export default SurveyPage;
