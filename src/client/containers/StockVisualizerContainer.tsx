/**
 * @module StockVisualizerContainer.tsx
 * @description Stock Visualizer Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChartInfo from '../components/chartInfo/ChartInfo';

const readStocksVisualizerWorker = require('../stock-visualizer.worker');

import {
  setStocksVisualizerData,
  calcStocksVisualizerPending,
  calcStocksVisualizerSuccess,
  calcStocksVisualizerError,
  calcStocksVisualizerStop,
} from '../actions/actionCreators';
import StocksChart from '../components/StocksChart';
import moment = require('moment');

const SP500_NAME = "S&P 500";

class StockVisualizerContainer extends React.Component<any> {
  worker: any = null;

  refreshChart = () => {
    if(this.props.stocksVisualizationLoading){
      this.killRunningWorker();
      this.worker = new readStocksVisualizerWorker();
      this.worker.addEventListener('message', this.handleWorkerEvent);
    }
    this.runWorkerCalculations();
  }

  killRunningWorker = () => {
    this.worker.terminate();
    this.props.calcStocksVisualizerStop();
  }

  runWorkerCalculations = () => {
    const getStocksNames = (top: number = 10) => this.props.companyList
      .slice(0, top)
      .map((el: any) => el.ticker.split('.')[0]);

    // console.log(getStocksNames(this.props.topStocksFilter));

    this.props.calcStocksVisualizerPending();
    this.worker.postMessage({
      event: 'readData',
      stocksList: [
        SP500_NAME,
        ...getStocksNames(this.props.topStocksFilter)
      ],
      topStocksFilter: this.props.topStocksFilter
    });
  }

  componentWillUnmount() {
    this.killRunningWorker();
  }

  componentDidMount() {
    this.worker = new readStocksVisualizerWorker();
    this.worker.addEventListener('message', this.handleWorkerEvent);
    this.runWorkerCalculations();
  }

  handleWorkerEvent = (workerEvent: any) => {
    const { event, data, companiesCount } = workerEvent.data;
    switch(event){
      case 'SUCCESS':
        this.props.calcStocksVisualizerSuccess();
        this.someLogic(data, companiesCount);
        break;
      default:
        alert(data);
        this.props.calcStocksVisualizerError();
    }
  }

  calcSmthForStocks = (stocksList: any, investmentAmount: any) => {
    return stocksList
      .map((el: any) => {
        const firstDateValue = el.lol[0].value;
        return {
          ...el,
          share: investmentAmount / firstDateValue
        };
      })
      .map((el: any) => ({
        ...el,
        lol: el.lol.map((ell: any) => ({
          ...ell,
          calculated: ell.value * el.share
        }))
      }));
  }

  someLogic = (arr: any, companiesCount: number) => {
    const ALL_INVESTMENT = 10000; //$
    // const STOCK_COUNT = 50; // top 50
    const portfolioStocks = arr.filter((el: any) => el.name !== 'S&P 500');

    // const STOCKS_COUNT = portfolioStocks.length; // top 50
    // console.log(portfolioStocks.length, 'portfolioStocks.length');
    console.log(companiesCount, 'companiesCount');

    const STOCKS_COUNT = companiesCount; // top 50
    // each share is fair, so
    const INVESTMENT_INTO_ONE_STOCK = ALL_INVESTMENT / STOCKS_COUNT; // %

    const sP500Stock = arr.filter((el: any) => el.name === 'S&P 500');

    const sP500StockCalculated = this.calcSmthForStocks(
      sP500Stock,
      ALL_INVESTMENT
    );

    const portfolioStocksCalculated = this.calcSmthForStocks(
      portfolioStocks,
      INVESTMENT_INTO_ONE_STOCK
    );

    const matrix = portfolioStocksCalculated
      .map((el: any) => el.lol.map((ell: any) => ell.calculated));
    const calculatedPortfolioList = this.calcMatrixHorizontally(matrix);

    const allData = sP500StockCalculated[0].lol.map((el: any, i: number) => ({
      name: el.date, // date
      sp500: Math.round(el.calculated.toFixed()),
      portfolio1: Math.round(calculatedPortfolioList[i])
    }));

    console.log('allData', allData);

    // this.props.setStocksVisualizerData(allData);
    this.props.setStocksVisualizerData({data: allData, companiesCount});
    // this.setState({ chartData: allData });
    return portfolioStocksCalculated;
  }

  calcMatrixHorizontally = (matrix: any) => {
    // [[1, 2, 3], [5, 6, 7], [9, 10, 11]]
    const sum = (r: any, a: any) => r.map((b: any, i: any) => a[i] + b);
    return matrix.reduce(sum);
  }

  render() {
    const { stocksVisualizerData, stocksVisualizationLoading } = this.props;
    const finalBalance = stocksVisualizerData.length
      ? stocksVisualizerData[stocksVisualizerData.length - 1]
      : {};

    const fromDate = stocksVisualizerData.length
      ? moment(new Date(stocksVisualizerData[0].name)).format("MMM YYYY")
      : '';
    const toDate = stocksVisualizerData.length
      ? moment(new Date(stocksVisualizerData[stocksVisualizerData.length - 1].name)).format("MMM YYYY")
      : '';

    return (
      <div className="stock-container stock-container--visualizer chart-visualizer">
        <StocksChart
          loading={stocksVisualizationLoading}
          data={stocksVisualizerData}
        />
        {!stocksVisualizationLoading &&
          <ChartInfo
            companiesCount={this.props.companiesCount}
            toDate={toDate}
            fromDate={fromDate}
            finalBalance={finalBalance}
          />}
        {!stocksVisualizationLoading &&
          <div
            style={{
              display: 'inlie-block',
              position: 'absolute',
              bottom: '0',
              right: '0',
            }}
            className='btn'
            onClick={this.refreshChart}>
            R
          </div>}
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
  stocksVisualizerData: state.company.stocksVisualizerData,
  topStocksFilter: state.company.topStocksFilter,
  companiesCount: state.company.companiesCount,
  stocksVisualizationLoading: state.loading.stocksVisualizationLoading,
  isBacktestModal: state.company.isBacktestModal,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({
    setStocksVisualizerData,
    calcStocksVisualizerPending,
    calcStocksVisualizerSuccess,
    calcStocksVisualizerError,
    calcStocksVisualizerStop,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StockVisualizerContainer);

