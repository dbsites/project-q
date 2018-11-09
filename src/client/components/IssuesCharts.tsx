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

  //ie...{7d9dc278-a6dc-4701-8b23-448ae3000cbb: "strongly disagree"...}
  // console.log('user issues obj: ', userIssues);

  // user issues objects array with name and their position
  //{
  //  name: "Drug Legalization",
  //  leaning: "disagree"
  //}
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
  }

  return (
    <div className='quad' id="quad-issues">
      {/* <h3>Issues</h3> */}
      <div className="issues-container">
        {display}
      </div>
    </div>
  );
}

export default IssuesCharts;
