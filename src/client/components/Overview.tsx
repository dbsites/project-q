/**
 * @module Overview.tsx
 * @description 
 */

import * as React from 'react';

import OverviewPie from './OverviewPie';
// import { number } from 'prop-types';

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

  if (!props.selected) {

    display = (<p>Click a company to see their overview</p>);

  } else {

    const {
      description,
      overallScore,
      yearFounded,
      numberEmployees,
      full_name,
      url,
      /* logoticker */ } = props.selected;

    const userIssuesLength = Object.keys(props.selected)
      .filter(key => props.selected[key].alignedScore)
      .length;

    const overall = Math.round(overallScore / userIssuesLength);

    const descrip = description.slice(0, 500);

    display = (
      <React.Fragment>
        <div id="overview-left">
          <h2>{full_name}</h2>
          <div id="overall-score-chart">
            <OverviewPie overall={overall} />
          </div>
          {/* <p id="company-market-price">Market Price: {ticker.split('.')[0]}</p> */}
          <h2>{overall}% Match</h2>
        </div>
        <div id="overview-right">
          {/* <h3>{name} ({ticker.split('.')[0]})</h3> */}
          <div id="overview-logo">
            <p>INSERT COMPANY LOGO</p>
            {/* <img src={logo} /> */}
          </div>
          <div id="overview-description-container">
            <div id="company-info-more">
              <ul>
                <li><strong>Founded </strong>{yearFounded}</li>
                <li><strong># of Employees </strong>{numberEmployees}</li>
              </ul>
            </div>
            <p id="company-info">
              {descrip}
            </p>
            <p id="company-url-pre">
              Learn more at: <a href={`http://${url}`} target="_blank">{url}</a>
            </p>
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
