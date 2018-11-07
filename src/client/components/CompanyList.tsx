/**
 * @module CompanyList.tsx
 * @description Company list quad displaying various categories
 */

import * as React from 'react';
import { Link } from 'react-router-dom'

const CompanyList = (props: any) => {
  const companyList: any = Object.assign({}, props.list.companyDataArray);

  const companyNames: any = Object.keys(companyList)
    .map((companyName: any) =>
      <Link id={companyName} className="company-names-list" to="#" onClick={props.selectCompany}>
        {companyName}
      </Link>
    );

  const companyTickers = () => {
    const companyTickersArr: any = [];
    const companyNames: any = Object.keys(companyList);

    for (let i = 0; i < companyNames.length; i += 1) {
      const company = companyList[companyNames[i]];
      companyTickersArr.push(
        <p id={i.toString()} className="company-list" onClick={props.sortListBy}>
          {company.ticker}
        </p>
      );
    }
    return companyTickersArr;
  }


  return (
    <div className="divTable">
      <div className="divTableBody">
        <div className="divTableRow">
          <div className="divTableHead">
            <div className="company-category" id="company-category-name">
              <Link to='#' className="header-category" id='company-name' onClick={props.sortListBy}>COMPANY</Link>
              {companyNames}
            </div>
            <div className="company-category" id="company-category-ticker">
              <Link to='#' className="header-category" id='company-ticker' onClick={props.sortListBy}>TICKER</Link>
              {companyTickers()}
            </div>


            {/* ***********************************/}
            {/* make this dynamic on user choices */}
            {/* ***********************************/}

            <div className="company-category" id="company-category-overall">
              <Link to='#' className="header-category" id='company-overall' onClick={props.sortListBy}>OVERALL</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              <p>OVERALL</p>
            </div>
            <div className="company-category" id="company-category-issue-one">
              <Link to='#' className="header-category" id='company-issue-1' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-two">
              <Link to='#' className="header-category" id='company-issue-2' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-three">
              <Link to='#' className="header-category" id='company-issue-3' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-four">
              <Link to='#' className="header-category" id='company-issue-4' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-five">
              <Link to='#' className="header-category" id='company-issue-5' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-six">
              <Link to='#' className="header-category" id='company-issue-6' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              <p>SCORE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="quad" id="company-list-quad">
    //   <div className="quad-box" id="quad-box-cl">
    //     <table>
    //       {companyCategories}
    //       {/* {test} */}
    //       {/* {companyList} */}
    //     </table>
    //   </div>
    // </div>
  );
}

export default CompanyList;
