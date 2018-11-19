/**
 * @module CompanyList.tsx
 * @description Company list quad displaying various categories
 */

import * as React from 'react';

// Import IssueID -> IssueName table for conversion
import * as issueMatch from '../issueMatcher';

// Import navigational links for company names
import { Link } from 'react-router-dom'

// Import loading GIF 
const loadingMovie = require('../assets/loading-movie.gif');

const CompanyList = (props: any) => {
  const { companyList, sortListBy, userIssues, issueAbbrvs } = props;
  const { issueMatcher } = issueMatch;

  // Load movie while fetching company list 
  if (companyList.length === 0) {
    return (
      <div className="quad" id="quad-company-list">
        <img src={loadingMovie} id="loading-movie" />
      </div>
    )
    // Clicking company name will fetch stockData etc.
  } else {
    const companyNames: any = companyList
      .map((company: any, index: any) =>
        <Link id={index} className="company-names-list" to="#" onClick={(e) => {
          props.selectCompany(e);
          props.getCompanyInfo(e, company.ticker);
        }}>
          {company.short_name}
        </Link>
      );

    // Company stock ticker names
    const companyTickers: any = companyList
      .map((company: any, index: any) =>
        <p id={index.toString()} className="company-list">
          {company.ticker.split('.')[0]}
        </p>
      );
    
    // Company overall scores
    const companyOverallScores = () => {
      const companyOverallScoresArray = [];
      let score: number = 0;

      // Create array of user issue objects with converted name
      const userIssuesArray = Object.keys(userIssues)
        .map((issueID: any) => {
          return {
            name: issueMatcher[issueID],
            leaning: userIssues[issueID]
          }
        });

      // Calculate scores of companies based off user issues
      if (companyList.length > 0) {
        for (let i = 0; i < companyList.length; i += 1) {
          userIssuesArray.forEach((issue: any) => {
            if (issue.leaning.includes('con'))
              score += companyList[i][issue.name].disagreeScore;
            else
              score += companyList[i][issue.name].agreeScore
          })

          // Color match based off of score
          score = Math.round(score / userIssuesArray.length)
          let color = {
            color: score >= 70 ? '#16C33F' : score >= 40 ? '#FAEB00' : '#FA2929'
          }

          // Add 
          companyOverallScoresArray.push(
            <p className="company-list" style={color}>
              {score}
            </p>
          )
          score = 0;
        }
      }
      return companyOverallScoresArray;
    }


    const companyScoresPerIssue = () => {
      const companyScorePerIssueArray = [];
      let issueScoresArray = [];
      let score: number = 0;

      const userIssuesArray = Object.keys(userIssues)
        .map((issueID: any) => {
          return {
            name: issueMatcher[issueID],
            leaning: userIssues[issueID]
          }
        });

      if (companyList.length > 0) {
        for (let a = 0; a < Object.keys(userIssues).length; a += 1) {
          for (let i = 0; i < companyList.length; i += 1) {

            if (userIssuesArray[a].leaning.includes('con'))
              score = companyList[i][userIssuesArray[a].name].disagreeScore;
            else
              score = companyList[i][userIssuesArray[a].name].agreeScore;

            let color = {
              color: score >= 70 ? '#16C33F' : score >= 40 ? '#FAEB00' : '#FA2929'
            }

            issueScoresArray.push(
              <p className="company-list" style={color}>
                {score}
              </p>
            );
            score = 0;
          }
          const name = userIssuesArray[a].name.split(' ').join('=');

          const abbrvSearchWord = name.slice(0, 2);

          const issueWord: any = Object.keys(issueAbbrvs)
            .filter((issueName: any) => issueName.includes(abbrvSearchWord));

          companyScorePerIssueArray.push(
            <div className="cl-category" id="cl-category-issue">
              <Link to='#' className="cl-header" id={'cl-header-' + name} onClick={props.sortListBy}>{issueAbbrvs[issueWord[0]]}</Link>
              <div className="cl-list">
                {...issueScoresArray}
              </div>
            </div>
          );
          issueScoresArray = [];
        }
      }
      return companyScorePerIssueArray;
    };

    return (
      <div className="divTable" id="quad-company-list">
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableHead">

              <div className="cl-category" id="cl-category-name">
                <Link to='#' className="cl-header" id='cl-header-name' onClick={sortListBy}>COMPANY</Link>
                <div className="cl-list">
                  {companyNames}
                </div>
              </div>

              <div className="cl-category" id="cl-category-ticker">
                <Link to='#' className="cl-header" id='cl-header-ticker' onClick={props.sortListBy}>TICKER</Link>
                <div className="cl-list">
                  {companyTickers}
                </div>
              </div>

              <div className="cl-category" id="cl-category-overall">
                <Link to='#' className="cl-header" id='cl-header-overall' onClick={props.sortListBy}>OVL</Link>
                <div className="cl-list">
                  {companyOverallScores()}
                </div>
              </div>

              {companyScoresPerIssue()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyList;

