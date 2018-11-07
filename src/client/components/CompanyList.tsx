/**
 * @module CompanyList.tsx
 * @description Company list quad displaying various categories
 */

import * as React from 'react';
import { Link } from 'react-router-dom'

const CompanyList = (props: any) => {
  // console.log('cl:', props);

  const companyNames = props.list
    .map((company: any, index: string) =>
      <p id={index} onClick={props.selectCompany}>
        {company.name};
      </p>
    );
  // const companyList = props.list
  //   .map((company: any, idx: string) =>
  //     <tr>
  //       <td>
  //         <Link id={idx} to='#' onClick={props.selectCompany}>
  //           {company.name.substring(0, 12)}
  //           {/*company name max 12 chars*/}
  //         </Link>
  //       </td>
  //       <td>
  //         {company.ticker}
  //       </td>
  //       {/* placeholder data */}
  //       <td>400</td>
  //       <td>3.5</td>
  //       <td>410</td>
  //       <td>390</td>
  //       <td>76</td>
  //       <td>36</td>
  //       <td>88</td>
  //       <td>100</td>
  //       <td>64</td>
  //       <td>43</td>
  //       <td>11</td>
  //     </tr>
  //   );

  // const companyCategories = (

  // );

  return (
    <div className="divTable">
      <div className="divTableBody">
        <div className="divTableRow">
          <div className="divTableHead">
            <div className="company-category" id="company-category-name">
              <Link to='#' id='company-name' onClick={props.sortListBy}>COMPANY</Link>
              {/* INSERT COMPANY NAMES LIST HERE */}
              {companyNames.slice(0, 5)}
              <p>NAME</p>
            </div>
            <div className="company-category" id="company-category-ticker">
              <Link to='#' id='company-ticker' onClick={props.sortListBy}>TICKER</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(5, 10)}
              <p>TICKER</p>
            </div>
            <div className="company-category" id="company-category-price">
              <Link to='#' id='company-price' onClick={props.sortListBy}>PRICE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(10, 15)}
              <p>PRICE</p>
            </div>
            <div className="company-category" id="company-category-change">
              <Link to='#' id='company-change' onClick={props.sortListBy}>CHG</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(15, 20)}
              <p>CHG</p>
            </div>
            <div className="company-category" id="company-category-52H">
              <Link to='#' id='company-52H' onClick={props.sortListBy}>52H</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(20, 25)}
              <p>52H</p>
            </div>
            <div className="company-category" id="company-category-52L">
              <Link to='#' id='company-52L' onClick={props.sortListBy}>52L</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(25, 30)}
              <p>52L</p>
            </div>

            {/* ***********************************/}
            {/* make this dynamic on user choices */}
            {/* ***********************************/}

            <div className="company-category" id="company-category-overall">
              <Link to='#' id='company-overall' onClick={props.sortListBy}>OVERALL</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(30, 35)}
              <p>OVERALL</p>
            </div>
            <div className="company-category" id="company-category-issue-one">
              <Link to='#' id='company-issue-1' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(35, 40)}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-two">
              <Link to='#' id='company-issue-2' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(40, 45)}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-three">
              <Link to='#' id='company-issue-3' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(45, 50)}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-four">
              <Link to='#' id='company-issue-4' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(50, 55)}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-five">
              <Link to='#' id='company-issue-5' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(55, 60)}
              <p>SCORE</p>
            </div>
            <div className="company-category" id="company-category-issue-six">
              <Link to='#' id='company-issue-6' onClick={props.sortListBy}>ISSUE</Link>
              {/* INSERT COMPANY TICKER LIST HERE */}
              {companyNames.slice(60, 65)}
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
