/**
 * @module IssuesCharts.tsx
 * @description User Issues By Company Component
 */

import * as React from 'react';
import * as issueMatch from '../issueMatcher';

import IssuePie from './IssuePie';

const placeholderIMG1 = require('../assets/placehold_man.png');

const placeholderIMG2 = require('../assets/placehold_woman.png');
/** 
 * Interface for IssueCharts Props
*/

interface Props {
  modalData?: any
  politicianData?: any
  selectedCompany: any
  selectedData: any
  userIssues: any
}

const IssuesCharts = (props: Props) => {
  const { modalData, politicianData } = props.selectedData;
  const { selectedCompany, userIssues } = props;
  const { issueMatcher } = issueMatch;

  let msg, display: JSX.Element[];

  const userIssuesArray = Object.keys(userIssues)
    .map((issueID: any) => {
      return {
        name: issueMatcher[issueID],
        leaning: userIssues[issueID]
      }
    });

  if (selectedCompany) {
    msg = 'Hover over charts below for detailed descriptions';

    display = userIssuesArray
      .map((issueObj: any) => {
        const { name, leaning } = issueObj;
        const { alignedScore } = selectedCompany[name];
        const issueInfo = { name, leaning, alignedScore };
        return <IssuePie info={issueInfo} modal={modalData} politician={politicianData} />
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
      <div className="issues-politicians">
        <p className="polit-recip">Top Recipients</p>
        <div className="politician">
          <img src={placeholderIMG1} />
        </div>
        <p className="polit-info">POLITICIAN NAME</p>
        <div className="politician">
          <img src={placeholderIMG2} />
        </div>
        <p className="polit-info">POLITICIAN NAME</p>
        <div className="politician">
          <img src={placeholderIMG1} />
        </div>
        <p className="polit-info">POLITICIAN NAME</p>
      </div>
    </div>
  );
}

export default IssuesCharts;
