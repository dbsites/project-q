/**
 * @module IssuesCharts.tsx
 * @description User Issues By Company Component
 */

import * as React from 'react';
import * as issueMatch from '../issueMatcher';

import IssuePie from './IssuePie';

/** 
 * Interface for IssueCharts Props
*/

interface Props {
  selectedCompany: any
  userIssues: any
}

const IssuesCharts = (props: Props) => {
  const { selectedCompany, userIssues } = props;
  const { issueMatcher } = issueMatch;

  let display: JSX.Element[];

  const userIssuesArray = Object.keys(userIssues)
    .map((issueID: any) => {
      return {
        name: issueMatcher[issueID],
        leaning: userIssues[issueID]
      }
    });

  if (selectedCompany) {

    display = userIssuesArray
      .map((issueObj: any) => {
        const { name, leaning } = issueObj;
        const { alignedScore } = selectedCompany[name];
        const issueInfo = { name, leaning, alignedScore };
        return <IssuePie info={issueInfo} />
      });
  }
  else {
    display = userIssuesArray
      .map((issueObj: any) => {
        const { name } = issueObj;
        const issueInfo = { name };
        return <IssuePie info={issueInfo} />
      });
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
