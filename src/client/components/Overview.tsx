/**
 * @module Overview.tsx
 * @description 
 */

import * as React from 'react';

const Overview = (props: any) => {

  console.log('in overview:', props.selected)

  let display;

  if (!props.selected.ticker) {
    display = (<p>Click a company to see their overview</p>);
  }

  else {
    const { description, logo, ticker, name } = props.selected;
    display = (
      <ul>
        <li key={ticker}>
          <h2>Name: {ticker} {name}</h2>
          <em>Logo: {logo}</em>
          <p>Description: {description}</p>
        </li>
      </ul>
    )
  }
  return (
    <div className='quad'>
      <h3>Overview</h3>
      {display}
    </div>
  );
}

export default Overview;
