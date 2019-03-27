/**
 * @module QuadsDisplay.tsx
 * @description Quads display component
 */

import * as React from 'react';

// Import Components
import Overview from '../components/Overview';
import StockGraph from './StockGraph';
import IssuesCharts from '../components/IssuesCharts';
import CompanyList from '../components/CompanyList';
import StockVisualizerContainer from '../containers/StockVisualizerContainer';

const QuadsDisplay = (props: any) => {
  return (
    <React.Fragment>
      <Overview
        selected={props.selected}
        hoverInfo={props.hoverOverviewInfo}
        displayDetail={props.displayDetails}
      />
      {props.isStocksVisualizerActive
        ? <StockVisualizerContainer />
        : <StockGraph selected={props.selected} stockData={props.stockData} />
      }
      <IssuesCharts
        displayDetail={props.displayDetails}
        hoverOn={props.hoverOn}
        hoverOff={props.hoverOff}
        selectedCompany={props.selected}
        selectedData={props.selectedData}
        userIssues={props.issues}
      />
      <CompanyList
        companyList={props.list}
        getSelectedCompanyInfo={props.info}
        getStockData={props.stock}
        sortListBy={props.sort}
        selectCompany={props.select}
        selectedCompany={props.selected}
        userIssues={props.issues}
        issueAbbrvs={props.abbrvs}
        togglePortfolio={props.togglePortfolio}
        filterSector={props.filterSector}
        toggleStocksVisualizer={props.toggleStocksVisualizer}
        isStocksVisualizerActive={props.isStocksVisualizerActive}
        topStocksFilter={props.topStocksFilter}
        setTopStocksFilter={props.setTopStocksFilter}
      />
    </React.Fragment>
  );
};
export default QuadsDisplay;
