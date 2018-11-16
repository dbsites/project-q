/**
 * @module Overview.tsx
 * @description Overview Quad Component
 */

import * as React from 'react';

import OverviewPie from './OverviewPie';

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
      // logo,
      ticker } = props.selected;

    const userIssuesLength = Object.keys(props.selected)
      .filter(key => props.selected[key].alignedScore)
      .length;

    const overall = Math.round(overallScore / userIssuesLength);

    const descrip = description.slice(0, 450);

    const scoreAlign = overall >= 70 ? 'Strong Match' : overall >= 40 ? 'Match' : 'Weak Match';

    display = (
      <React.Fragment>
        <div className="overview-left">
          <div className="overview-company-title">
            <h3>{full_name} ({ticker.split('.')[0]})</h3>
          </div>
          <div id="overall-score-chart">
            <OverviewPie overall={overall} />
          </div>
          <h2>{scoreAlign}</h2>
        </div>

        <div id="overview-right">
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
