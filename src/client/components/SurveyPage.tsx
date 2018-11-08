/**
 * @module SurveyPage.tsx
 * @description Survey Page Presentation Component
 */

import * as React from 'react';
import Header from '../containers/HeaderContainer'

const SurveyPage = (props: any) => {
  const { headerText, surveyArray, footerButtons } = props;
  return (
    <div className="main-dashboard">
      <div className="header">
        <Header />
      </div>
      <div className="dashboard-header">
        {headerText}
      </div>
      <div className="survey-dashboard-container">
        {surveyArray}
      </div>
      <div className="dashboard-footer">
        {footerButtons}
      </div>
    </div>
  );
};

export default SurveyPage;
