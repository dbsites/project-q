/**
 * @module Overview.tsx
 * @description 
 */

import * as React from 'react';

import { PieChart } from 'react-easy-chart';

// interface CompanyInfo {
//   readonly description: string,
//   readonly logo: string,
//   readonly ticker: string,
//   readonly name: string,
//   readonly overallScore: number,
// }

// interface SelectedCompany {
//   readonly selected: CompanyInfo
// }

const Overview = (props: any) => {

  let display;

  if (!props.selected.ticker) {
    display = (<p>Click a company to see their overview</p>);
  } else {
    const {
      description,
      overallScore,
      yearFounded,
      numberEmployees,
      url,
      /* logoticker */ } = props.selected;

    const userIssuesLength = Object.keys(props.selected)
      .filter(key => props.selected[key].alignedScore)
      .length;

    const overall = Math.floor(overallScore / userIssuesLength);

    const overallColor = overall >= 60 ? '#436F4D' : overall >= 50 ? '#898A40' : '#6F4343';
    const diff = 100 - overall;

    const descrip = description.slice(0, 450);

    display = (
      <React.Fragment>
        <div id="overview-left">
          <h2>{overall}% Match</h2>
          <div id="overall-score-chart">
            <PieChart
              // labels
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
          <span id="company-info-more">
            <p>Founded: <br />{yearFounded}</p>
            <p>Employees: <br /> {numberEmployees}</p>
          </span>
        </div>
        <div id="overview-right">
          {/* <h3>{name} ({ticker.split('.')[0]})</h3> */}
          <div id="overview-logo">
            <p>INSERT COMPANY LOGO</p>
            {/* <img src={logo} /> */}
          </div>
          <div id="overview-description-container">
            <p id="company-info">
              {descrip}
            </p>
            <p id="company-url-pre">
              More information at:
            </p>
            <a href={`http://${url}`} target="_blank">{url}</a>
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
