/**
 * @module companyReducer
 * @description Reducer for User Dashboard
 * UNIT TEST COVERAGE - 0%
 */

import actions from '../actions/actionTypes';

import * as issueMatch from '../issueMatcher';

const initialCompanyState: /*CompanyDataState*/ any = {
  selectedCompany: null,
  fullCompanyModal: null,
  fullCompanyPolit: null,
  selectedCompanyData: {},
  currentCompanyStockData: {},
  companyList: [],
  companyListModal: [],
  userIssues: {},
  issueAbbrvs: {},
  displayDetails: false,
  hoverOverviewInfo: {},
  portfolioMode: 'sp500',
  portfolioList: [],
  filteredList: [],

  stocksVisualizerData: [],
  isStocksVisualizerActive: false,
  topStocksFilter: 10,
  isBacktestModal: false,
  startDateCompanyName: ''
};

const { issueMatcher } = issueMatch;

const companyReducer = (state: any = initialCompanyState, action: any): any => {
  switch (action.type) {
    case actions.FETCH_COMPANY_LIST:
      return {
        ...state,
        companyList: Object.values(action.data.companyDataArray),
        companyListModal: Object.values(action.data.companyDataArray),
        issueAbbrvs: action.data.issueAbbrvs
      };

    case actions.SET_DEFAULT_COMPANY:
      return {
        ...state,
        selectedCompany: state.companyList[0]
      };

    case actions.GET_USER_ISSUES:
      return {
        ...state,
        userIssues: Object.assign({}, action.payload)
      };

    case actions.ADD_COMPANY_SCORE:
      const updatedCompanyList = state.companyList.slice(0);
      const userIssuesArray = Object.keys(state.userIssues).map(
        (issueID: any) => {
          return {
            name: issueMatcher[issueID],
            leaning: state.userIssues[issueID].position,
            weight: state.userIssues[issueID].weight
          };
        }
      );

      if (state.companyList.length > 0) {
        for (let i = 0; i < state.companyList.length; i += 1) {
          let score = 0;
          let denominator = 0;
          userIssuesArray.forEach((issue: any) => {
            if (issue.leaning.includes('con')) {
              score = score + (state.companyList[i][issue.name].disagreeScore * issue.weight);
            } else {
              score = score + (state.companyList[i][issue.name].agreeScore * issue.weight);
            }
            denominator += issue.weight;
          });
          updatedCompanyList[i].overallScore = Math.round(score / denominator);
          // console.log(updatedCompanyList[i].overallScore, 'overall Score')

        }
      }

      updatedCompanyList.sort(
        (a: any, b: any): any => {
          return b.overallScore - a.overallScore;
        }
      );

      return {
        ...state,
        companyList: updatedCompanyList
      };

    case actions.GET_STOCK_INFO:
      return {
        ...state,
        currentCompanyStockData: Object.assign({}, action.payload.stockData)
      };

    case actions.GET_SELECTED_COMPANY_INFO:
      const { moduleData, politData } = action.payload;

      return {
        ...state,
        selectedCompanyData: {
          moduleData,
          politData
        }
      };

    case actions.GET_ALL_COMPANY_INFO:
      const { modalData, politicianData } = action.payload;
      return {
        ...state,
        fullCompanyModal: modalData,
        fullCompanyPolit: politicianData
      };

    case actions.MERGE_ISSUE_SCORES:
      const newCompanyList = state.companyList.slice(0);
      const userIssuesArr = Object.keys(state.userIssues).map(
        (issueID: any) => {
          return {
            name: issueMatcher[issueID],
            leaning: state.userIssues[issueID].position
          };
        }
      );

      if (newCompanyList.length > 0) {
        for (let i = 0; i < newCompanyList.length; i += 1) {
          userIssuesArr.forEach((issue: any) => {
            if (issue.leaning.includes('con'))
              newCompanyList[i][issue.name].alignedScore =
                newCompanyList[i][issue.name].disagreeScore;
            else
              newCompanyList[i][issue.name].alignedScore =
                newCompanyList[i][issue.name].agreeScore;
          });
        }
      }
      return {
        ...state,
        companyList: newCompanyList,
        filteredList: newCompanyList
      };

    case actions.RESET_USER_ISSUES:
      return {
        ...state,
        userIssues: {}
      };

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
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              if (a.short_name.toUpperCase() < b.short_name.toUpperCase())
                return -1;
              if (a.short_name.toUpperCase() > b.short_name.toUpperCase())
                return 1;
              return 0;
            }
          );
        } else {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              if (a.short_name.toUpperCase() > b.short_name.toUpperCase())
                return -1;
              if (a.short_name.toUpperCase() < b.short_name.toUpperCase())
                return 1;
              return 0;
            }
          );
        }
      } else if (category === 'ticker') {
        /**
         * Sort list by 'TICKER'
         */
        const topListCompanyTicker = companyArray[0].ticker;
        if (topListCompanyTicker[0] !== 'Z') {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              if (a.ticker.toUpperCase() > b.ticker.toUpperCase()) return -1;
              if (a.ticker.toUpperCase() < b.ticker.toUpperCase()) return 1;
              return 0;
            }
          );
        } else {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              if (a.ticker.toUpperCase() < b.ticker.toUpperCase()) return -1;
              if (a.ticker.toUpperCase() > b.ticker.toUpperCase()) return 1;
              return 0;
            }
          );
        }
      } else if (category === 'overall') {
        /**
         * Sort list by 'SCORE'
         */
        const lowestScoreCompany = companyArray.reduce(
          (lowest: any, next: any) =>
            lowest.overallScore > next.overallScore ? next : lowest
        );

        const highestScoreCompany = companyArray.reduce(
          (lowest: any, next: any) =>
            lowest.overallScore > next.overallScore ? lowest : next
        );

        const topListCompany = companyArray[0];

        if (
          topListCompany.overallScore !== highestScoreCompany.overallScore &&
          topListCompany.overallScore !== lowestScoreCompany.overallScore
        ) {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              return b.overallScore - a.overallScore;
            }
          );
        } else if (
          topListCompany.overallScore === highestScoreCompany.overallScore
        ) {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              return a.overallScore - b.overallScore;
            }
          );
        } else {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              return b.overallScore - a.overallScore;
            }
          );
        }
      }

      // category === 'issue', category is the search term
      else {
        const categoryName = category.replace(/=/g, ' ').trim();

        const lowestScoreCompany = companyArray.reduce(
          (lowest: any, next: any) =>
            lowest[categoryName].alignedScore > next[categoryName].alignedScore
              ? next
              : lowest
        );

        const highestScoreCompany = companyArray.reduce(
          (lowest: any, next: any) =>
            lowest[categoryName].alignedScore > next[categoryName].alignedScore
              ? lowest
              : next
        );

        const topListCompany = companyArray[0];

        if (
          topListCompany[categoryName].alignedScore !==
          highestScoreCompany[categoryName].alignedScore &&
          topListCompany[categoryName].alignedScore !==
          lowestScoreCompany[categoryName].alignedScore
        ) {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              return (
                b[categoryName].alignedScore - a[categoryName].alignedScore
              );
            }
          );
        } else if (
          topListCompany[categoryName].alignedScore ===
          highestScoreCompany[categoryName].alignedScore
        ) {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              return (
                a[categoryName].alignedScore - b[categoryName].alignedScore
              );
            }
          );
        } else {
          sortedList = companyArray.slice(0).sort(
            (a: any, b: any): any => {
              return (
                b[categoryName].alignedScore - a[categoryName].alignedScore
              );
            }
          );
        }
      }

      return {
        ...state,
        companyList: sortedList
      };

    /***********************************************/
    /* HOVER ON/OFF ON ISSUE PIES, UPDATE OVERVIEW */
    /***********************************************/

    case actions.HOVER_ON:
      return {
        ...state,
        displayDetails: true,
        hoverOverviewInfo: action.payload
      };

    case actions.HOVER_OFF:
      return {
        ...state,
        displayDetails: false,
        hoverOverviewInfo: {}
      };

    /***********************************************/
    /* TOGGLE PORTFOLIO MODE, FILTER BY CATEGORY   */
    /***********************************************/

    case actions.TOGGLE_PORTFOLIO:
      /* User portfolio has not been uploaded yet */
      if (action.payload === 'portfolio' && !state.portfolioList.length)
        return state;

      if (action.payload && action.payload !== state.portfolioMode) {
        const selected = document.getElementById(action.payload);
        const deselected = document.getElementById(state.portfolioMode);
        const companyListDiv = document.getElementById('cl-table');

        if (selected !== null && selected.classList.contains('no-upload')) {
          selected.classList.remove('no-upload');
          selected.classList.add('active');
        }

        if (selected !== null && deselected !== null) {
          selected.classList.add('selected');
          deselected.classList.remove('selected');
        }

        if (companyListDiv !== null) {
          if (action.payload === 'portfolio')
            companyListDiv.style.display = 'none';
          else companyListDiv.style.display = 'block';
        }
      }

      return {
        ...state,
        portfolioMode: action.payload
      };

    case actions.FILTER_SECTOR:
      if (action.payload === 'Filter All' || action.payload.length === 0) {
        return {
          ...state,
          companyList: state.filteredList
        };
      }

      return {
        ...state,
        companyList: state.filteredList.filter(
          (c: any) => c.sector === action.payload
        )
      };

    case actions.TOGGLE_STOCKS_VISUALIZER: {
      return {
        ...state,
        isStocksVisualizerActive: !state.isStocksVisualizerActive,
      };
    }
    case actions.SET_STOCKS_VISUALIZER_DATA: {
      return {
        ...state,
        stocksVisualizerData: action.payload.data,
        companiesCount: action.payload.companiesCount,
        startDateCompanyName: action.payload.startDateCompanyName,
      };
    }
    case actions.SET_TOP_STOCKS_COUNT: {
      return {
        ...state,
        topStocksFilter: action.payload,
      };
    }

    case actions.TOGGLE_BACKTEST_PORTFOLIO_MODAL: {
      return {
        ...state,
        isBacktestModal: !state.isBacktestModal,
      };
    }

    case actions.CALC_STOCKS_VISUALIZER_STOP:
    case actions.CALC_STOCKS_VISUALIZER_ERROR: {
      return {
        ...state,
        stocksVisualizerData: [],
        startDateCompanyName: '',
        companiesCount: undefined
      };
    }

    default:
      return state;
  }
};

export default companyReducer;
