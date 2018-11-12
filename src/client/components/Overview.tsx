/**
 * @module Overview.tsx
 * @description 
 */

import * as React from 'react';

import { PieChart } from 'react-easy-chart';

interface CompanyInfo {
  readonly description: string,
  readonly logo: string,
  readonly ticker: string,
  readonly name: string,
  readonly overallScore: number,
}

interface SelectedCompany {
  readonly selected: CompanyInfo
}

const Overview = (props: SelectedCompany) => {

  console.log('overview in props: ', props);
  let display;

  //TODO: styling --> center justify this to quad
  if (!props.selected.ticker) {
    display = (<p>Click a company to see their overview</p>);
  }

  else {
    const { logo, description, ticker/*, overallScore , name*/ } = props.selected;

    const overall = Math.floor(Math.random() * 100);
    const overallColor = overall >= 50 ? '#005005' : '#8e0000';
    const diff = 100 - overall;
    console.log('overall: ', overall, ' diff: ', diff);


    display = (
      <React.Fragment>
        <div id="overview-left">
          <h3>Overall Score</h3>
          <h1>{overall}</h1>
          <div id="overall-score-chart">
            <PieChart
              size={150}
              data={[
                { key: 'Overall', value: overall/*overallScore*/, color: overallColor },
                { key: 'Difference', value: diff, color: '#000000' }
              ]}
            />
          </div>
          <p>Market Price: {ticker}</p>
          <p>Founded: 1975</p>
          <p># of Employees: 175</p>
          <a href="#">Website</a>
        </div>
        <div id="overview-right">
          <img src={logo} id="overview-logo" />
          <p>{description}</p>
        </div>

      </React.Fragment>
    )
  }
  return (
    <div className='quad' id="quad-overview">
      <div className="quad-container-overview">
        {display}
      </div>
    </div>
  );
}

export default Overview;
