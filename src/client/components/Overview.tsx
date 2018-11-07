/**
 * @module Overview.tsx
 * @description 
 */

import * as React from 'react';

const Overview = (props: any) => {

  let display;

  if (!props.selected.id) {
    display = (<p>Click a company to see their overview</p>);
  }

  else {
    const { description, logo, id, name } = props.selected;
    display = (
      <ul>
        <li key={id}>
          <h2>Name: {name}</h2>
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
