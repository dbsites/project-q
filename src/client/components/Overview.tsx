/**
 * @module Overview.tsx
 * @description Overview Quad Component
 */

import * as React from 'react';

// Import Component
import OverviewPie from './OverviewPie';

// TODO when store structure finalized
// import { CompanyDataState } from '../reducers/types';

const Overview = (props: any) => {
  let display;

  // Once dashboard loads before selection
  if (!props.selected) {
    display = <p>Loading Overview . . . </p>;
  } else {
    const {
      description,
      overallScore,
      yearFounded,
      numberEmployees,
      url,
      logo
    } = props.selected;

    // Get number of user-selected issues (length)
    const userIssuesLength = Object.keys(props.selected).filter(
      key => props.selected[key].alignedScore
    ).length;

    // Get overall company score based off user issues
    const overall = Math.round(overallScore / userIssuesLength);

    // Declare 'match' outcome based off overall score
    const scoreAlign =
      overall >= 70 ? 'Strong Match' : overall >= 40 ? 'Match' : 'Weak Match';

    display = (
      <React.Fragment>
        <div id="overview-left">
          <div id="overall-score-chart">
            <OverviewPie overall={overall} />
          </div>
          <h3>{scoreAlign}</h3>
        </div>

        <div id="overview-right">
          <div id="overview-logo">
            <img src={logo} />
          </div>
          <div id="overview-description-container">
            <p id="company-info">{description}</p>
            <div id="company-info-more">
              <p>
                <span>
                  <strong>Founded: </strong>
                  {yearFounded}
                </span>
                <span>
                  <strong># of Employees: </strong>
                  {numberEmployees
                    .toString()
                    .split('')
                    .reverse()
                    .reduce((numString: string, next: string, i: number) => {
                      if (i % 3 === 0 && i !== 0)
                        numString = `${next},` + numString;
                      else numString = next + numString;
                      return numString;
                    }, '')}
                </span>
              </p>
            </div>
            <p id="company-url-pre">
              Learn more at:{' '}
              <a href={`http://${url}`} target="_blank">
                {url}
              </a>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return (
    <div className="quad" id="quad-overview">
      <div className="overview-container">{display}</div>
    </div>
  );
};

export default Overview;
