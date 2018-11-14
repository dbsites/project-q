/**
 * @module StockGraph.tsx
 * @description 
 */

import * as React from 'react';

const StockGraph = (props: any) => {
  const { ticker } = props.selected;
  let display: any;

  if (!ticker) {
    display = (<p>Click company for stock market performance</p>)
  } else {
    const URI = `https://api.stockdio.com/visualization/financial/charts/v1/ComparePrices?app-key=50EC4535F41E4734BC8AD78686377BAC&symbol=${ticker.split('.')[0]}&indices=SPX&days=30&palette=Financial-Light&grayscaleLogo=true&animate=true&googleFont=true`
    display = (
      <iframe frameBorder='0' scrolling='no' src={URI}>
      </iframe >
    );
  }

  return (
    <div className='quad' id="quad-stock">
      <div className="stock-container">
        {display}
      </div>
    </div>
  );
}

export default StockGraph;
