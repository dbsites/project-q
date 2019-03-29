/**
 * @module ChartInfo.tsx
 * @description Chart Info Component
 * UNIT TEST COVERAGE - 0%
 */

import * as React from 'react';
import './ChartInfo.scss';

const ChartInfo = () => {
  // const {} = props;
  return (
    <div className="chart-visualizer-info">
      <div className="chart-visualizer-info__block">
        <div className="chart-visualizer-info__el">Portfolio</div>
        <div className="chart-visualizer-info__el blue">{`Your Portfolio (Top ${10})`}</div>
        <div className="chart-visualizer-info__el red">{'S&P 500'}</div>
      </div>
      <div className="chart-visualizer-info__block">
        <div className="chart-visualizer-info__el">Initial Balance</div>
        <div className="chart-visualizer-info__el blue">$10,000</div>
        <div className="chart-visualizer-info__el red">$10,000</div>
      </div>
      <div className="chart-visualizer-info__block">
        <div className="chart-visualizer-info__el">Final Balance</div>
        <div className="chart-visualizer-info__el blue">{`$${2452}`}</div>
        <div className="chart-visualizer-info__el red">{`$${2453}`}</div>
      </div>
      <div className="chart-visualizer-info__block">
        <div className="chart-visualizer-info__text">
  {`Note: The time period was automatically adjusted based on the available data (${'June 2003'} - ${'Feb 2019'}) for the selected asset: ${'Netflix (NFLX)'}`}
        </div>
      </div>
    </div>
  );
};

export default ChartInfo;

