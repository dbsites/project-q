/**
 * @module companyReducer
 * @description Reducer for User Dashboard
 * UNIT TEST COVERAGE - 0%
 */

import actions from '../actions/actionTypes';
// import { CompanyDataState } from '../reducers/types';
import * as issueMatch from '../issueMatcher';
// import { selectCompany } from '../actions/actionCreators';

const initialCompanyState: /*CompanyDataState*/any = {
  selectedCompany: null,
  currentCompanyStockData: {},
  // selectedCompanyData: {},
  companyList: [],
  companyListModal: [],
  userIssues: {},
  issueAbbrvs: {}
};

const { issueMatcher } = issueMatch;

const companyReducer = (state: any = initialCompanyState, action: any): any => {
  switch (action.type) {

    case actions.FETCH_COMPANY_LIST:
      const companyListArray = Object.values(action.data.companyDataArray);
      return {
        ...state,
        companyList: companyListArray,
        issueAbbrvs: action.data.issueAbbrvs
      };

    case actions.GET_USER_ISSUES:
      return {
        ...state,
        userIssues: Object.assign({}, action.payload)
      };

    case actions.ADD_COMPANY_SCORE:
      const updatedCompanyList = state.companyList.slice(0);
      const userIssuesArray = Object.keys(state.userIssues)
        .map((issueID: any) => {
          return {
            name: issueMatcher[issueID],
            leaning: state.userIssues[issueID]
          }
        });

      let score = 0;

      if (state.companyList.length > 0) {
        for (let i = 0; i < state.companyList.length; i += 1) {
          userIssuesArray.forEach((issue: any) => {
            if (issue.leaning.includes('con'))
              score += state.companyList[i][issue.name].disagreeScore;
            else
              score += state.companyList[i][issue.name].agreeScore
          })
          updatedCompanyList[i].overallScore = score;
          score = 0;
        }
      }

      return {
        ...state,
        companyList: updatedCompanyList
      }

    case actions.GET_STOCK_INFO:
      return {
        ...state,
        currentCompanyStockData: Object.assign({}, action.payload.stockData),
      }
    // case actions.ADD_COMPANY_INFO:
    //   const { modalData, politicianData, stockData } = action.payload;
    //   return {
    //     ...state,
    //     selectedCompanyData: { modalData, politicianData, stockData }
    //   };

    case actions.MERGE_ISSUE_SCORES:
      const newCompanyList = state.companyList.slice(0);
      const userIssuesArr = Object.keys(state.userIssues)
        .map((issueID: any) => {
          return {
            name: issueMatcher[issueID],
            leaning: state.userIssues[issueID]
          }
        });

      if (newCompanyList.length > 0) {
        for (let i = 0; i < newCompanyList.length; i += 1) {
          userIssuesArr.forEach((issue: any) => {
            if (issue.leaning.includes('con'))
              newCompanyList[i][issue.name].alignedScore =
                newCompanyList[i][issue.name].disagreeScore;
            else
              newCompanyList[i][issue.name].alignedScore =
                newCompanyList[i][issue.name].agreeScore;
          })
        }
      }
      return {
        ...state,
        companyList: newCompanyList
      }


    case actions.SELECT_COMPANY:
      const companyList = Object.values(state.companyList);
      const position = action.payload.field;

      return {
        ...state,
        selectedCompany: companyList[position]
      };


    case actions.SORT_COMPANY_LIST:
      const companyArray = state.companyList;
      const category = action.payload.field.split('-')[2];
      let sortedList;

      /**
       * Sort list by 'COMPANY NAME'
       */
      if (category === 'name') {
        const topListCompanyName = companyArray[0].short_name;
        if (topListCompanyName[0] !== '2') {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            if (a.short_name.toUpperCase() < b.short_name.toUpperCase()) return -1;
            if (a.short_name.toUpperCase() > b.short_name.toUpperCase()) return 1;
            return 0;
          });
        } else {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            if (a.short_name.toUpperCase() > b.short_name.toUpperCase()) return -1;
            if (a.short_name.toUpperCase() < b.short_name.toUpperCase()) return 1;
            return 0;
          });
        }
      }

      /**
       * Sort list by 'TICKER'
       */
      else if (category === 'ticker') {
        const topListCompanyTicker = companyArray[0].ticker;
        if (topListCompanyTicker[0] !== 'Z') {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            if (a.ticker.toUpperCase() > b.ticker.toUpperCase()) return -1;
            if (a.ticker.toUpperCase() < b.ticker.toUpperCase()) return 1;
            return 0;
          });
        } else {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            if (a.ticker.toUpperCase() < b.ticker.toUpperCase()) return -1;
            if (a.ticker.toUpperCase() > b.ticker.toUpperCase()) return 1;
            return 0;
          });
        }
      }
      /**
       * Sort list by 'SCORE'
       */
      else if (category === 'overall') {
        const lowestScoreCompany = companyArray.reduce((lowest: any, next: any) => lowest.overallScore > next.overallScore ? next : lowest);

        const highestScoreCompany = companyArray.reduce((lowest: any, next: any) => lowest.overallScore > next.overallScore ? lowest : next);

        const topListCompany = companyArray[0];

        if (topListCompany.overallScore !== highestScoreCompany.overallScore && topListCompany.overallScore !== lowestScoreCompany.overallScore) {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            return b.overallScore - a.overallScore;
          });
        } else if (topListCompany.overallScore === highestScoreCompany.overallScore) {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            return a.overallScore - b.overallScore;
          })
        } else {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            return b.overallScore - a.overallScore;
          })
        }
      }

      // category === 'issue', category is the search term
      else {
        const categoryName = category.replace(/=/g, ' ').trim();

        const lowestScoreCompany = companyArray.reduce((lowest: any, next: any) => lowest[categoryName].alignedScore > next[categoryName].alignedScore ? next : lowest);

        const highestScoreCompany = companyArray.reduce((lowest: any, next: any) => lowest[categoryName].alignedScore > next[categoryName].alignedScore ? lowest : next);

        const topListCompany = companyArray[0];

        if (topListCompany[categoryName].alignedScore !== highestScoreCompany[categoryName].alignedScore && topListCompany[categoryName].alignedScore !== lowestScoreCompany[categoryName].alignedScore) {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            return b[categoryName].alignedScore - a[categoryName].alignedScore;
          });
        }
        else if (topListCompany[categoryName].alignedScore === highestScoreCompany[categoryName].alignedScore) {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            return a[categoryName].alignedScore - b[categoryName].alignedScore;
          })
        }
        else {
          sortedList = companyArray.slice(0).sort((a: any, b: any): any => {
            return b[categoryName].alignedScore - a[categoryName].alignedScore;
          })
        }
      }

      return {
        ...state,
        companyList: sortedList
      };

    default:
      return state;
  }
}

export default companyReducer;
