/**
 * @module IssuesCharts.tsx
 * @description User Issues By Company Component
 */

import * as React from 'react';
import { Component } from 'react';

// Import IssueID -> IssueName table for conversion
import * as issueMatch from '../issueMatcher';

// Import Components
import IssuePie from './IssuePie';
import Recipients from './Recipients';

// TODO: move this props in types.ts and export in
interface Props {
  moduleData?: any;
  politData?: any;
  selectedCompany: any;
  selectedData: any;
  userIssues: any;
  displayDetail: any;
  hoverOn: any;
  hoverOff: any;
}

// TODO transition component state to redux
class IssuesCharts extends Component<Props> {
  render() {
    const { moduleData, politData } = this.props.selectedData;
    const { selectedCompany, userIssues, hoverOn, hoverOff, displayDetail } = this.props;
    const { issueMatcher } = issueMatch;

    let msg, display: JSX.Element[];

    const userIssuesArray = Object
      .keys(userIssues)
      .map((issueID: any) =>
        ({ name: issueMatcher[issueID] }));

    while (userIssuesArray.length !== 6) {
      userIssuesArray.push({ name: 'No Issue Selected' });
    }

    if (!selectedCompany) {
      msg = 'Select a company to view their issues scores';

      display = userIssuesArray.map((issueObj: any, i: number) => {
        return <IssuePie key={i} info={{ name: issueObj.name }} />;
      });
    } else {
      msg = 'Hover over charts below for detailed descriptions';

      display = userIssuesArray.map((issueObj: any, index: number) => {
        if (name !== 'No Issue Selected') {
          const { name } = issueObj;
          const { logo } = selectedCompany;
          const { alignedScore } = selectedCompany[name];

          return (
            <IssuePie
              key={index}
              logo={logo}
              info={{ name, alignedScore }}
              modal={moduleData}
              polit={politData}
              detailedView={displayDetail}
              handleMouseEnter={(blurb: string, name: string, alignedScore: number) => hoverOn(blurb, name, alignedScore)}
              handleMouseLeave={() => hoverOff()}
            />
          );
        } else {
          return <IssuePie key={index} info={{ name: issueObj.name }} />;
        }
      });
    }

    return (
      <div className="quad" id="quad-issues">
        <div className="issues-container">
          <p id="issues-header">{msg}</p>
          {display}
        </div>
        <Recipients data={politData} />
      </div>
    );
  }
}

export default IssuesCharts;
