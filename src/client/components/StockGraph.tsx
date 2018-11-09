/**
 * @module StockGraph.tsx
 * @description 
 */

import * as React from 'react';
const stockGraphIMG = require('../assets/stock-graph.png')

const StockGraph = (props: any) => {
  let display: any = (<p>Click company for stock market performance</p>)

  if (props.selected) {
    display = (<img src={stockGraphIMG} id="img-stock-graph" />);
  }
  // if (!props.selected.id) {
  //   display = (<p>Click a company to see their overview</p>);
  // }

  return (
    <div className='quad' id="quad-stock">
      <div className="issues-container">
        {display}
      </div>
      {/* <h3>Stock Graph</h3> */}
      {/* <img src={stockGraphIMG} id="img-stock-graph" /> */}
    </div>
  );
}

export default StockGraph;
