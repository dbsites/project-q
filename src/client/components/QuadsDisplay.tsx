/**
 * @module QuadsDisplay.tsx
 * @description Quads display component
 */

import * as React from 'react';

import Overview from '../components/Overview';
import StockGraph from '../components/StockGraph';
import IssuesCharts from '../components/IssuesCharts';
import CompanyList from '../components/CompanyList';

const QuadsDisplay = (props: any) => {
  return (
    <React.Fragment>
      <Overview
        selected={props.selected}
      />
      <StockGraph />
      <IssuesCharts
        selectedCompany={props.selected}
        userIssues={props.issues}
      />
      <CompanyList
        companyList={props.list}
        sortListBy={props.sort}
        selectCompany={props.select}
        userIssues={props.issues}
      />
    </React.Fragment>
  )
}
export default QuadsDisplay;
