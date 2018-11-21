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
import { render } from 'enzyme';

// TODO: move this props in types.ts and export in
interface Props {
  moduleData?: any
  politData?: any
  selectedCompany: any
  selectedData: any
  userIssues: any
}

class IssuesCharts extends Component<Props> {
  state: any;
  constructor(props: any) {
    super(props);

    this.state = {
      pieIndex: 0,
      displayDetail: true
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)

  }

  handleMouseEnter(index: any) {
    this.setState({ pieIndex: index, displayDetail: true });
  }

  handleMouseLeave() {
    this.setState({ displayDetail: false })
  }

  render() {
    const { moduleData, politData } = this.props.selectedData;
    const { selectedCompany, userIssues } = this.props;
    const { issueMatcher } = issueMatch;

    let msg, display: JSX.Element[];

    const userIssuesArray = Object.keys(userIssues)
      .map((issueID: any) => {
        return {
          name: issueMatcher[issueID],
        }
      });

    if (selectedCompany) {
      msg = 'Hover over charts below for detailed descriptions';

      display = userIssuesArray
        .map((issueObj: any, index: any) => {
          const { name } = issueObj;
          const { alignedScore } = selectedCompany[name];
          const issueInfo = { name, alignedScore };
          const detailedView = this.state.displayDetail && this.state.pieIndex === index;
          return <IssuePie
            info={issueInfo}
            modal={moduleData}
            polit={politData}
            detailedView={detailedView}
            handleMouseEnter={() => this.handleMouseEnter(index)}
            handleMouseLeave={this.handleMouseLeave}
            // (this.handleMouseEnter)(event) (() => this.handleMouseEnter(index))(event)
          />
        });
    }
    else {
      msg = 'Select a company to view their issues scores';

      display = userIssuesArray
        .map((issueObj: any) => {
          const { name } = issueObj;
          const issueInfo = { name };
          
          return <IssuePie
            info={issueInfo}
          />
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
}

export default IssuesCharts;
