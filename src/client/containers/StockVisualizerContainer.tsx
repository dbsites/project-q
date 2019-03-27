/**
 * @module StockVisualizerContainer.tsx
 * @description Stock Visualizer Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as actions from '../actions/actionCreators';
import StocksChart from '../components/StocksChart';

const StockVisualizerContainer = (_: any) => {
  
  return (
    <div className="stock-container">
      <StocksChart />
    </div>
  );
};

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StockVisualizerContainer);

