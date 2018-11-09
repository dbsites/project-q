/**
 * @module Overview.tsx
 * @description 
 */

import * as React from 'react';

const Overview = (props: any) => {

  // console.log('in overview:', props.selected)

  let display;

  if (!props.selected.ticker) {
    display = (<p>Click a company to see their overview</p>);
  }

  else {
    const { description, logo, ticker, name } = props.selected;
    display = (
      <ul id="list-overview">
        <li key={ticker}>
          <h2>{name} ({ticker})</h2>
          <img src={logo} id="overview-company-logo" />
          <p>{description}</p>
        </li>
      </ul>
    )
  }
  return (
    <div className='quad' id="quad-overview">
      <div className="quad-container">
        {display}

      </div>
      {/* <h3>Overview</h3> */}
    </div>
  );
}

export default Overview;
