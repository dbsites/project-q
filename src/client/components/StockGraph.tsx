/**
 * @module StockGraph.tsx
 * @description 
 */

import * as React from 'react';

const StockGraph = (props: any) => {
  let display;

  if (!props.selected.id) {
    display = (<p>Click a company to see their overview</p>);
  }

  return (
    <div className='quad'>
      <h3>Stock Graph</h3>
      {display}
    </div>
  );
}

export default StockGraph;
