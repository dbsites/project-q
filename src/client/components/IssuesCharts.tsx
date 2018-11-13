/**
 * @module IssuesCharts.tsx
 * @description User issues broken down by company selection
 */

import * as React from 'react';

// Link up in the refactor
// import { getIssueName } from '../reducers/issuesReducer';

import IssuePieChart from './IssuePieChart';
import * as issueMatch from '../issueMatcher';
// import Issue from './Issue';

const IssuesCharts = (props: any) => {
  const {
    selectedCompany,
    userIssues
  } = props;

  const { issueMatcher } = issueMatch;
  let display: any = (<p>Click company for scores on issues you care about</p>);

  const userIssuesArray = Object.keys(userIssues)
    .map((issueID: any) => {
      return {
        name: issueMatcher[issueID],
        leaning: userIssues[issueID]
      }
    });

  if (selectedCompany.name) {

    display = userIssuesArray
      .map((issueObj: any) => {
        const { name, leaning } = issueObj;
        const { agreeScore, disagreeScore } = selectedCompany[name];
        const issueInfo = { name, leaning, agreeScore, disagreeScore };
        return <IssuePieChart info={issueInfo} />
      });
  } else {
    display = [];
    while (display.length !== )
  }

  return (
    <div className='quad' id="quad-issues">
      <div className="issues-container">
        {display}
      </div>
    </div>
  );
}

export default IssuesCharts;
