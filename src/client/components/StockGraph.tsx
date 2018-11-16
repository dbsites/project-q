/**
 * @module StockGraph.tsx
 * @description Stock API Presentational Component
 */

import * as React from 'react';

const StockGraph = (props: any) => {

  let display: any;

  if (!props.selected) {
    display = (<p>Select a company for stock market performance</p>)
  } else {
    const { ticker } = props.selected;
    const URI = `https://api.stockdio.com/visualization/financial/charts/v1/ComparePrices?app-key=50EC4535F41E4734BC8AD78686377BAC&symbol=${ticker.split('.')[0]}&indices=SPX&includeCompetitors=true&palette=Relief&showLogo=No&animate=true&googleFont=true&backgroundColor=000000`;

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
