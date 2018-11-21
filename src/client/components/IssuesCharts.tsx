/**
 * @module IssuesCharts.tsx
 * @description User Issues By Company Component
 */

import * as React from 'react';

// Import IssueID -> IssueName table for conversion
import * as issueMatch from '../issueMatcher';

// Import Components
import IssuePie from './IssuePie';
import Recipients from './Recipients';

// TODO: move this props in types.ts and export in
interface Props {
  moduleData?: any
  politData?: any
  selectedCompany: any
  selectedData: any
  userIssues: any
}

const IssuesCharts = (props: Props) => {
  const { moduleData, politData } = props.selectedData;
  const { selectedCompany, userIssues } = props;
  const { issueMatcher } = issueMatch;

  let msg, display: JSX.Element[];

  const userIssuesArray = Object.keys(userIssues)
    .map((issueID: any) => {
      return {
        name: issueMatcher[issueID],
      }
    });

  while (userIssuesArray.length !== 6) {
    userIssuesArray.push({ name: 'No Issue Selected' });
  }

  if (selectedCompany) {
    msg = 'Hover over charts below for detailed descriptions';

    display = userIssuesArray
      .map((issueObj: any) => {
        const { name } = issueObj;
        if (name !== 'No Issue Selected') {
          const { alignedScore } = selectedCompany[name];
          const issueInfo = { name, alignedScore };
          return <IssuePie
            info={issueInfo}
            modal={moduleData}
            polit={politData}
          />
        } else {
          const issueInfo = { name };
          return <IssuePie
            info={issueInfo}
          />
        }
      });
  }
  else {
    msg = 'Select a company to view their issues scores';

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
        <p id="issues-header">{msg}</p>
        {display}
      </div>
      <Recipients data={politData} />
    </div>
  );
}

export default IssuesCharts;
