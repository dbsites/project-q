/**
 * @module IssuesCharts.tsx
 * @description User issues broken down by company selection
 */

import * as React from 'react';

// Link up in the refactor
// import { getIssueName } from '../reducers/issuesReducer';

import * as issueMatch from '../issueMatcher';

const IssuesCharts = (props: any) => {
  const {
    selectedCompany,
    userIssues
  } = props;

  const { issueMatcher } = issueMatch;
  let display: any = 'Click company for scores on issues you care about';

  //ie...{7d9dc278-a6dc-4701-8b23-448ae3000cbb: "strongly disagree"...}
  console.log('user issues obj: ', userIssues);

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
        let agreeScore, disagreeScore;

        if (leaning.includes('dis')) {
          disagreeScore = (<strong>{selectedCompany[name].disagreeScore}</strong>);
          agreeScore = (<span>{selectedCompany[name].agreeScore}</span>)
        } else {
          agreeScore = (<strong>{selectedCompany[name].agreeScore}</strong>);
          disagreeScore = (<span>{selectedCompany[name].disagreeScore}</span>)
        }

        return (
          <p>
            {name}: Agree {agreeScore} / Disagree {disagreeScore}... You lean '{leaning}'
          </p>
        );
      });
  }

  return (
    <div className='quad'>
      <h3>Issues</h3>
      {display}
    </div>
  );
}

export default IssuesCharts;
