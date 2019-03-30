/**
 * @module CompanyList.tsx
 * @description Company list quad displaying various categories
 */

import * as React from 'react';

// Import IssueID -> IssueName table for conversion
import * as issueMatch from '../issueMatcher';

// Import navigational links for company names
import { Link } from 'react-router-dom';

// Import loading GIF
const loadingMovie = require('../assets/loading-movie.gif');

const CompanyList = (props: any) => {
  const {
    companyList,
    sortListBy,
    userIssues,
    issueAbbrvs,
    selectedCompany,
    togglePortfolio,
    toggleStocksVisualizer,
    filterSector,
    isStocksVisualizerActive,
    setTopStocksFilter
  } = props;
  const { issueMatcher } = issueMatch;
  const issueNamesArray: any[] = [];

  // Load movie while fetching company list
  if (!selectedCompany) {
    return (
      <div className="quad" id="quad-company-list">
        <img src={loadingMovie} id="loading-movie" />
      </div>
    );

    // Clicking company name will fetch stockData etc.
  } else {
    // Company names list
    const companyNames: any = companyList.map((company: any, index: any) => {
      const bgColor = index % 2 === 0 ? 'black' : 'grey';
      return (
        <Link
          id={index}
          className={'company-names-list ' + bgColor}
          to="#"
          key={index}
          onClick={e => props.selectCompany(e, company.ticker)}
        >
          {company.short_name}
        </Link>
      );
    });

    // Company stock ticker names
    const companyTickers: any = companyList.map((company: any, index: any) => {
      const bgColor = index % 2 === 0 ? 'black' : 'grey';
      return (
        <p
          id={index.toString()}
          key={index}
          className={'company-list ' + bgColor}
        >
          {company.ticker.split('.')[0]}
        </p>
      );
    });

    // Company overall scores
    const companyOverallScores = () => {
      const companyOverallScoresArray = [];
      let score: number = 0;

      // Create array of user issue objects with converted name
      const userIssuesArray = Object.keys(userIssues).map((issueID: any) => {
        return {
          name: issueMatcher[issueID],
          leaning: userIssues[issueID]
        };
      });

      // Calculate scores of companies based off user issues
      if (companyList.length > 0) {
        for (let i = 0; i < companyList.length; i += 1) {
          userIssuesArray.forEach((issue: any) => {
            if (issue.leaning.includes('con'))
              score += companyList[i][issue.name].disagreeScore;
            else score += companyList[i][issue.name].agreeScore;
          });

          // Color match based off of score
          score = Math.round(score / userIssuesArray.length);

          let color = {
            color: score >= 70 ? '#16C33F' : score >= 40 ? '#FAEB00' : '#FA2929'
          };

          const bgColor = i % 2 === 0 ? 'black' : 'grey';
          // Add each score to company scores array
          companyOverallScoresArray.push(
            <p className={'company-list ' + bgColor} key={i} style={color}>
              {score}
            </p>
          );
          score = 0;
        }
      }
      return companyOverallScoresArray;
    };

    // Company scores per user-selected issue
    const companyScoresPerIssue = () => {
      const companyScorePerIssueArray = [];
      let issueScoresArray = [];
      let score: number = 0;

      // Create array of user issue objects with converted name
      const userIssuesArray = Object.keys(userIssues).map((issueID: any) => {
        return {
          name: issueMatcher[issueID],
          leaning: userIssues[issueID]
        };
      });

      while (userIssuesArray.length !== 6) {
        userIssuesArray.push({ name: 'NONE', leaning: '' });
      }

      // Calculate issue score and color coordinate
      if (companyList.length > 0) {
        for (let a = 0; a < Object.keys(userIssuesArray).length; a += 1) {
          for (let i = 0; i < companyList.length; i += 1) {
            const bgColor = i % 2 === 0 ? 'black' : 'grey';

            if (userIssuesArray[a].name !== 'NONE') {
              if (userIssuesArray[a].leaning.includes('con'))
                score = companyList[i][userIssuesArray[a].name].disagreeScore;
              else score = companyList[i][userIssuesArray[a].name].agreeScore;

              let color = {
                color:
                  score >= 70 ? '#16C33F' : score >= 40 ? '#FAEB00' : '#FA2929'
              };

              // Push company's issue score into array
              issueScoresArray.push(
                <p className={'company-list ' + bgColor} key={i} style={color}>
                  {score}
                </p>
              );
            } else {
              issueScoresArray.push(
                <p
                  className={'company-list none ' + bgColor}
                  key={i}
                  style={{ color: '#A5A8A6' }}
                >
                  ---
                </p>
              );
            }
            score = 0;
          }

          // Find name of specific issue...
          const name = userIssuesArray[a].name.split(' ').join('=');

          const abbrvSearchWord = name.slice(0, 2);

          const issueWord: any = Object.keys(issueAbbrvs).filter(
            (issueName: any) => issueName.includes(abbrvSearchWord)
          );

          // Add name to element for sorting purposes
          // Add onClick sorting functionality
          // Spread all scores to issue list

          if (name !== 'NONE') {
            issueNamesArray.push(
              <div className="cl-cat-name" id={'cl-nav-' + name}>
                <Link
                  to="#"
                  className="cl-header"
                  id={'cl-header-' + name}
                  onClick={props.sortListBy}
                >
                  {issueAbbrvs[issueWord[0]]}
                </Link>
              </div>
            );
          } else {
            issueNamesArray.push(
              <div className="cl-cat-name" id={'cl-nav-' + name}>
                <Link to="#" className="cl-header" id={'cl-header-' + name}>
                  NONE
                </Link>
              </div>
            );
          }

          companyScorePerIssueArray.push(
            <div
              className="cl-category cl-category-issue"
              id="cl-category-issue"
            >
              <div className="cl-list">{...issueScoresArray}</div>
            </div>
          );
          issueScoresArray = [];
        }
      }
      return companyScorePerIssueArray;
    };

    return (
      <div className="cl-quad" id="quad-company-list">
        <div id="cl-select">
          <button
            id="portfolio"
            className="no-upload"
            onClick={togglePortfolio}
            value="portfolio"
          >
            Your Portfolio
          </button>
          <div id="filter-sectors">
            <select id="filter-input" name="filter" placeholder="Filter by sector" onChange={e => filterSector(e)}>
              <option className="sector-option" value="All">All</option>
              <option className="sector-option" value="Consumer Discretionary">Consumer Discretionary</option>
              <option className="sector-option" value="Consumer Staples">Consumer Staples</option>
              <option className="sector-option" value="Energy">Energy</option>
              <option className="sector-option" value="Financials">Financials</option>
              <option className="sector-option" value="Health Care">Health Care</option>
              <option className="sector-option" value="Industrials">Industrials</option>
              <option className="sector-option" value="Information Technology">Information Technology</option>
              <option className="sector-option" value="Materials">Materials</option>
              <option className="sector-option" value="Real Estate">Real Estate</option>
              <option className="sector-option" value="Telecommunication Services">Telecommunication Services</option>
              <option className="sector-option" value="Utilities">Utilities</option>
            </select>
            <select
              placeholder='backtest portfolio'
              title='backtest portfolio'
              style={{marginRight: 0}}
              value={props.topStocksFilter}
              onChange={e => setTopStocksFilter(+e.target.value)}>
              {[10, 25, 50, 100].map((el: number) => (
                <option
                  className="sector-option"
                  key={el}
                  value={el}
                >{`Top ${el}`}</option>
              ))}
            </select>
          </div>
          <button
            onClick={props.toggleBacktestPortfolioModal}
            className='question-mark'>?</button>
          {companyList.length &&
            <button
              className="selected active"
              onClick={toggleStocksVisualizer}
            >
              {isStocksVisualizerActive ? 'Stockdio' : 'StocksChart'}
            </button>
          }
        </div>
        <div id="cl-nav">
          <div id="cl-nav-bar">
            <div className="cl-cat-name" id="cl-nav-name">
              <Link
                to="#"
                className="cl-header"
                id="cl-header-name"
                onClick={sortListBy}
              >
                COMPANY
              </Link>
            </div>
            <div className="cl-cat-name" id="cl-nav-ticker">
              <Link
                to="#"
                className="cl-header"
                id="cl-header-ticker"
                onClick={props.sortListBy}
              >
                TICKER
              </Link>
            </div>
            <div className="cl-cat-name" id="cl-nav-overall">
              <Link
                to="#"
                className="cl-header"
                id="cl-header-overall"
                onClick={props.sortListBy}
              >
                ALL
              </Link>
            </div>
            {...issueNamesArray}
          </div>
        </div>
        <div id="cl-table">
          <div id="cl-body">
            <div className="cl-category" id="cl-category-name">
              <div className="cl-list">{companyNames}</div>
            </div>
            <div className="cl-category" id="cl-category-ticker">
              <div className="cl-list">{companyTickers}</div>
            </div>
            <div className="cl-category" id="cl-category-overall">
              <div className="cl-list">{companyOverallScores()}</div>
            </div>
            {companyScoresPerIssue()}
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyList;
