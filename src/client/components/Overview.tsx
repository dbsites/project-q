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

  console.log('props in overview: ', props.selected.ticker);
  //TODO: styling --> center justify this to quad
  if (!props.selected.ticker) {
    display = (<p>Click a company to see their overview</p>);
  }

  else {
    const { description, /*ticker, overallScore, logo, name*/ } = props.selected;

    const overall = Math.floor(Math.random() * 100);
    const overallColor = overall >= 60 ? '#436F4D' : overall >= 50 ? '#898A40' : '#6F4343';
    const diff = 100 - overall;
    // yellow #898A40
    // 450 char count
    const descrip = description.slice(0, 450);
    // console.log('overall: ', overall, ' diff: ', diff);


    display = (
      <React.Fragment>
        <div id="overview-left">
          <h2>{overall}% Match</h2>
          <div id="overall-score-chart">
            <PieChart
              labels
              size={175}
              styles={{
                '.chart_text': {
                  fontFamily: 'serif',
                  fontSize: '30px',
                  fill: '#FFF'
                }
              }}
              data={[
                { key: `${overall}`, value: overall/*overallScore*/, color: overallColor },
                { key: '', value: diff, color: '#000000' }
              ]}
            />
          </div>
          {/* <p id="company-market-price">Market Price: {ticker.split('.')[0]}</p> */}
          <p id="company-info-more">
            <span id="company-info-found">
              Founded: 1975
              </span>
            <span id="company-info-employees">
              Employees: 175
              </span>
          </p>
        </div>
        <div id="overview-right">
          {/* <h3>{name} ({ticker.split('.')[0]})</h3> */}
          <div id="overview-logo"></div>
          <div id="overview-description-container">
            <p id="company-info">
              {descrip}
            </p>
            <p id="company-url-pre">
              More information at:
            </p>
            <a href="#">whatevercompanywebsite.com/</a>
          </div>
        </div>
      </React.Fragment>
    )
  }
  return (
    <div className='quad' id="quad-overview">
      <div className="overview-container">
        {display}
      </div>
    </div>
  );
}

export default Overview;
