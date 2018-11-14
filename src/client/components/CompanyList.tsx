/**
 * @module CompanyList.tsx
 * @description Company list quad displaying various categories
 */

import * as React from 'react';
import * as issueMatch from '../issueMatcher';
import { Link } from 'react-router-dom'

import Loading from './loading/Loading';

const CompanyList = (props: any) => {
  const { companyList, sortListBy, userIssues } = props;
  const { issueMatcher } = issueMatch;

  if (companyList.length === 0) {
    return <Loading />
  } else {
    const companyNames: any = companyList
      .map((company: any, index: any) =>
        <Link id={index} className="company-names-list" to="#" onClick={props.selectCompany}>
          {company.name}
        </Link>
      );

    const companyTickers: any = companyList
      .map((company: any, index: any) =>
        <p id={index.toString()} className="company-list">
          {company.ticker.split('.')[0]}
        </p>
      );

    const companyOverallScores = () => {
      const companyOverallScoresArray = [];
      let score: number = 0;

      const userIssuesArray = Object.keys(userIssues)
        .map((issueID: any) => {
          return {
            name: issueMatcher[issueID],
            leaning: userIssues[issueID]
          }
        });

      if (companyList.length > 0) {
        for (let i = 0; i < companyList.length; i += 1) {
          userIssuesArray.forEach((issue: any) => {
            if (issue.leaning.includes('con'))
              score += companyList[i][issue.name].disagreeScore;
            else
              score += companyList[i][issue.name].agreeScore
          })
          companyOverallScoresArray.push(
            <p className="company-list">
              {Math.round(score / userIssuesArray.length)}
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

            issueScoresArray.push(
              <p className="company-list">
                {score}
              </p>
            );
            score = 0;
          }
          const name = userIssuesArray[a].name.split(' ').join('=');
          console.log('name in company list: ', name);
          companyScorePerIssueArray.push(
            // TODO specific ID for div
            <div className="cl-category" id="cl-category-issue">
              <Link to='#' className="cl-header" id={'cl-header-' + name} onClick={props.sortListBy}>ISS</Link>
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
      <div className="divTable">
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableHead">

              <div className="cl-category" id="cl-category-overall">
                <Link to='#' className="cl-header" id='cl-header-overall' onClick={props.sortListBy}>OVERALL</Link>
                <div className="cl-list">
                  {companyOverallScores()}
                </div>
              </div>

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

              {companyScoresPerIssue()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyList;

