/**
 * @module SurveyPage.tsx
 * @description Survey Page Presentation Component
 */

import * as React from 'react';
import Header from '../../containers/HeaderContainer'
import Loading from '../loading/Loading';

const SurveyPage = (props: any) => {
  const { complete, headerText, surveyArray, leftButton, rightButton, footerBar } = props;
  if (complete) {
    return (<div className="main-dashboard">
      <div className="header">
        <Header />
      </div>
      <div className="dashboard-header" />
      <div className="survey-dashboard-container">
        <div className="dashboard-side" />
        <div className="survey-dashboard-question-container"><Loading loadingMessage="Calculating" /></div>
        <div className="dashboard-side" />
      </div>
      <div className="dashboard-footer">
        {footerBar}
      </div>
    </div>);
  }
  return (
    <div className="main-dashboard">
      <div className="header">
        <Header />
      </div>
      <div className="dashboard-header dashboard-survey-header">
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
