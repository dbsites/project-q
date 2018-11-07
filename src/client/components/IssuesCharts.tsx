import * as React from 'react';

const IssuesCharts = (props: any) => {
  let display;

  if (!props.selected.id) {
    display = (<p>Click a company to see their overview</p>);
  } else {
    display = (<p>Future graph for {props.selected.name}</p>)
  }

  return (
    <div className='quad'>
      <h3>Issues</h3>
      {display}
    </div>
  );
}

export default IssuesCharts;
