/**
 * @module QuadsContainer.tsx
 * @description Quads Container for User Dashboard
 */

import * as React from 'react';
import { connect } from 'react-redux';

// Import Actions
import * as actions from '../actions/actionCreators'

// Import Components
import Header from '../containers/HeaderContainer';
import QuadsDisplay from '../components/QuadsDisplay';

// Import CSS
import '../assets/QuadsContainer.css';

// TODO when store structure finalized
interface Props {
  selectedCompany: any
  selectedCompanyData: any
  companyList: any
  currentCompanyStockData: any
  userIssues: any
  issueAbbrvs: any
  fetchCompanyList: any
  sortCompanyList: any
  selectCompany: any
  getUserIssues: any
  getAllCompanyInfo: any
  getStockData: any
  getSelectedCompanyInfo: any
}

class QuadsContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchCompanyList,
      getUserIssues,
      getStockData,
      getSelectedCompanyInfo,
      getAllCompanyInfo,
    } = this.props;

    // Grabs user issues from user store and adds to company store
    getUserIssues();
    // Fetch company list from db and adds to company store
    fetchCompanyList();

    getStockData('MMM.N');
    setTimeout(() => { getSelectedCompanyInfo('MMM.N'); }, 4000);
    // Grab all companies modal and politician info
    getAllCompanyInfo();
  }

  render() {
    // Extract state to props
    const {
      companyList,
      currentCompanyStockData,
      getSelectedCompanyInfo,
      getStockData,
      issueAbbrvs,
      selectCompany,
      selectedCompany,
      selectedCompanyData,
      sortCompanyList,
      userIssues
    } = this.props;

    return (
      <div className="main-dashboard">
        <div className="header">
          <Header />
        </div>
        <div id="quads-container">
          <QuadsDisplay
            info={getSelectedCompanyInfo}
            list={companyList}
            select={selectCompany}
            selected={selectedCompany}
            selectedData={selectedCompanyData}
            sort={sortCompanyList}
            stock={getStockData}
            stockData={currentCompanyStockData}
            issues={userIssues}
            abbrvs={issueAbbrvs}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
  currentCompanyStockData: state.company.currentCompanyStockData,
  selectedCompany: state.company.selectedCompany,
  selectedCompanyData: state.company.selectedCompanyData,
  userIssues: state.company.userIssues,
  issueAbbrvs: state.company.issueAbbrvs,
});

const mapDispatchToProps = (dispatch: any): any => ({
  fetchCompanyList: () => dispatch(actions.fetchCompanyList()),
  selectCompany: (event: any) => {
    event.preventDefault();
    dispatch(actions.selectCompany({ field: event.target.id }));
  },
  sortCompanyList: (event: any) => {
    event.preventDefault();
    dispatch(actions.sortCompanyList({ field: event.target.id }));
  },
  getUserIssues: () => dispatch(actions.getUserIssues()),
  getAllCompanyInfo: () => {
    dispatch(actions.getAllCompanyInfo());
  },
  getStockData: (ticker: string) => {
    dispatch(actions.getStockData(ticker));
  },
  getSelectedCompanyInfo: (ticker: string) => {
    dispatch(actions.getSelectedCompanyInfo(ticker));
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(QuadsContainer);
