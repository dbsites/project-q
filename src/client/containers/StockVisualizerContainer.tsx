/**
 * @module StockVisualizerContainer.tsx
 * @description Stock Visualizer Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const readStocksVisualizerWorker = require('../stock-visualizer.worker');

// import * as actions from '../actions/actionCreators';
import StocksChart from '../components/StocksChart';


class StockVisualizerContainer extends React.Component<any> {
  worker = null;

  componentDidMount() {
    this.worker = new readStocksVisualizerWorker();

    (this.worker as any).addEventListener('message', (workerEvent: any) => {
      switch(workerEvent.data.event){
        case 'SUCCESS':
          this.setState({isLoading: false});
          break;
        default:
          alert('error');
          this.setState({isLoading: false});
      }
      console.log(workerEvent.data);
      console.log(this.someLogic(workerEvent.data.data));
    });
  }

  calcSmthForStocks = (stocksList: any, investmentAmount: any) => {
    return stocksList
      .map((el: any) => ({
        ...el,
        share: investmentAmount / el.lol[0].value
      }))
      .map((el: any) => ({
        ...el,
        lol: el.lol.map((ell: any) => ({...ell, calculated: ell.value * el.share}))
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

    console.log('lool', allData);

    this.setState({ chartData: allData });
    return portfolioStocksCalculated;
  }

  calcMatrixHorizontally = (matrix: any) => {
    // [[1, 2, 3], [5, 6, 7], [9, 10, 11]]
    const sum = (r: any, a: any) => r.map((b: any, i: any) => a[i] + b);
    return matrix.reduce(sum);
  }

  render() {
    return (
      <div className="stock-container">
        <StocksChart />
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StockVisualizerContainer);

