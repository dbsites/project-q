/**
 * @module StockGraph.tsx
 * @description Stock API Presentational Component
 */

import * as React from "react";

// Garron's brilliant multi-line implementation for adding commas to price value
const commafy = (value: number) => {
  const dollars = value
    .toString()
    .split(".")[0]
    .split("")
    .reverse()
    .reduce((numString: string, next: string, i: number) => {
      if (i % 3 === 0 && i !== 0) numString = `${next},` + numString;
      else numString = next + numString;
      return numString;
    }, "");

  const cents = value.toString().split(".")[1] || "00";

  return `${dollars}.${cents}`;
};

// TODO when store structure finalized
const StockGraph = (props: any) => {
  let display;

  if (!props.selected) {
    display = <p>Loading Stock Graph. . . </p>;
  } else {
    let { ticker } = props.selected;
    let high, low, open, close, volume;

    // Before stock data retrieval, set defaults to 0
    if (!props.stockData.high) {
      high = 0;
      low = 0;
      open = 0;
      close = 0;
      volume = 0;
    } else {
      high = commafy(props.stockData.high);
      low = commafy(props.stockData.low);
      open = commafy(props.stockData.open);
      close = commafy(props.stockData.close);
      volume = commafy(props.stockData.volume);
    }
    // StockDIO API
    const URI = `https://api.stockdio.com/visualization/financial/charts/v1/ComparePrices?app-key=2B1593840F1B4446A9537D12E212FFFD&symbol=${
      ticker.split(".")[0]
    }&indices=SPX&includeCompetitors=false&tooltipsStyle=None&motif=Topbar&palette=Aurora&showBorderAndTitle=false&showLogo=No&animate=true&googleFont=true&backgroundColor=000000&height=350px`;
    display = (
      <React.Fragment>
        <iframe frameBorder="0" scrolling="no" src={URI} />
        <div className="stock-container-info">
          <ul className="stock-info-list">
            <li>
              <span className="stock-info-cat">High</span>
              <span>${high}</span>
            </li>
            <li>
              <span className="stock-info-cat">Low</span>
              <span>${low}</span>
            </li>
            <li>
              <span className="stock-info-cat">Open</span>
              <span>${open}</span>
            </li>
            <li>
              <span className="stock-info-cat">Close</span>
              <span>${close}</span>
            </li>
            <li>
              <span className="stock-info-cat">Volume</span>
              <span>${volume}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="quad" id="quad-stock">
      <div className="stock-container">{display}</div>
    </div>
  );
};

export default StockGraph;
