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

const SP500_NAME = "S&P 500";

class StockVisualizerContainer extends React.Component<any> {
  worker: any = null;

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

    // subscribe to worker message
    this.worker.addEventListener('message', (workerEvent: any) => {
      switch(workerEvent.data.event){
        case 'SUCCESS':
          this.props.calcStocksVisualizerSuccess();
          this.someLogic(workerEvent.data.data);
          break;
        default:
          alert(workerEvent.data.data);
          this.props.calcStocksVisualizerError();
      }
    });

    this.runWorkerCalculations();
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

  someLogic = (arr: any) => {
    const ALL_INVESTMENT = 10000; //$
    // const STOCK_COUNT = 50; // top 50
    const portfolioStocks = arr.filter((el: any) => el.name !== 'S&P 500');

    const STOCKS_COUNT = portfolioStocks.length; // top 50
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

    this.props.setStocksVisualizerData(allData);
    this.setState({ chartData: allData });
    return portfolioStocksCalculated;
  }

  calcMatrixHorizontally = (matrix: any) => {
    // [[1, 2, 3], [5, 6, 7], [9, 10, 11]]
    const sum = (r: any, a: any) => r.map((b: any, i: any) => a[i] + b);
    return matrix.reduce(sum);
  }

  render() {
    const { stocksVisualizerData, stocksVisualizationLoading } = this.props;
    return (
      <div className="stock-container stock-container--visualizer">
        <StocksChart
          loading={stocksVisualizationLoading}
          data={stocksVisualizerData}
        />
        {!stocksVisualizationLoading
          && <ChartInfo finalBalance={stocksVisualizerData[stocksVisualizerData.length - 1]} />}
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
  stocksVisualizerData: state.company.stocksVisualizerData,
  topStocksFilter: state.company.topStocksFilter,
  stocksVisualizationLoading: state.loading.stocksVisualizationLoading,
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

