/**
 * @module companyReducer
 * @description Reducer for User Dashboard
 */

import actions from '../actions/actionTypes';

const initialCompanyState: any = {
  selectedCompany: {},
  companyList: []
};

const companyReducer = (state: any = initialCompanyState, action: any): any => {
  switch (action.type) {
    case actions.FETCH_COMPANY_LIST:
      console.log('company list fetch: ', action.data);
      return {
        ...state,
        companyList: action.data,
      };

    case actions.SORT_COMPANY_LIST:
      const category = action.payload.field.split('-')[1];
      const topListCompany = state.companyList.slice(0, 1)[0];
      let sortedList;

      if (category === 'name') {
        if (topListCompany.name[0] !== 'Z') {
          sortedList = state.companyList.slice(0).sort((a: any, b: any): any => {
            if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
            if (a.name.toUpperCase() < b.name.toUpperCase()) return 1;
            return 0;
          });
        } else {
          sortedList = state.companyList.slice(0).sort((a: any, b: any): any => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
            if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
            return 0;
          });
        }
      }

      else if (category === 'ticker') {
        if (topListCompany.ticker[0] !== 'Z') {
          sortedList = state.companyList.slice(0).sort((a: any, b: any): any => {
            if (a.ticker.toUpperCase() > b.ticker.toUpperCase()) return -1;
            if (a.ticker.toUpperCase() < b.ticker.toUpperCase()) return 1;
            return 0;
          });
        } else {
          sortedList = state.companyList.slice(0).sort((a: any, b: any): any => {
            if (a.ticker.toUpperCase() < b.ticker.toUpperCase()) return -1;
            if (a.ticker.toUpperCase() > b.ticker.toUpperCase()) return 1;
            return 0;
          });
        }
      }

      return {
        ...state,
        companyList: sortedList
      };


    case actions.SELECT_COMPANY:
      const i = Number(action.payload.field);
      return {
        ...state,
        selectedCompany: state.companyList[i]
      };

    default:
      return state;
  }
}

export default companyReducer;
