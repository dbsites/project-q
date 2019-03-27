/**
 * @module StockVisualizerContainer.tsx
 * @description Stock Visualizer Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as actions from '../actions/actionCreators';
// import TermsOfService from '../components/TermsOfService';

const StockVisualizerContainer = (_: any) => {
  
  return (
    <div className="">
      StockVisualizerContainer
    </div>
  );
};

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StockVisualizerContainer);

