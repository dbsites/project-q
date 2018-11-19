/**
 * @module StockGraph.tsx
 * @description Stock API Presentational Component
 */

import * as React from 'react';

const StockGraph = (props: any) => {

  let display;

  if (!props.selected) {
    display = (<p>Select a company for stock market performance</p>)
  } else {
    const { ticker } = props.selected;
    let high, low, open, close, volume;

    // Before stock data retrieval, set defaults to 0
    if (!props.selectedData.stockData) {
      high = 0; low = 0; open = 0; close = 0; volume = 0;
    } else {
      high = props.selectedData.stockData.high;
      low = props.selectedData.stockData.low;
      open = props.selectedData.stockData.open;
      close = props.selectedData.stockData.close;
      volume = props.selectedData.stockData.volume;
    }

    // StockDIO API
    const URI = `https://api.stockdio.com/visualization/financial/charts/v1/ComparePrices?app-key=50EC4535F41E4734BC8AD78686377BAC&symbol=${ticker.split('.')[0]}&indices=SPX&includeCompetitors=true&palette=Relief&showLogo=No&animate=true&googleFont=true&backgroundColor=000000`;

    display = (
      <React.Fragment>
        <iframe frameBorder='0' scrolling='no' src={URI}>
        </iframe >
        <div className="stock-container-info">
          <ul className="stock-info-list">
            <li>High<span>{high}</span></li>
            <li>Low<span>{low}</span></li>
            <li>Open<span>{open}</span></li>
            <li>Close<span>{close}</span></li>
            <li>Volume<span>{volume
              .toString()
              .split('')
              .reverse()
              .reduce((numString: string, next: string, i: number) => {
                if (i % 3 === 0 && i !== 0) numString = `${next},` + numString;
                else numString = next + numString;
                return numString;
              }, '')}</span></li>
          </ul>
        </div>
      </React.Fragment>
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
