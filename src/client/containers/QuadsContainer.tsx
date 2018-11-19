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
  userIssues: any
  issueAbbrvs: any
  fetchCompanyList: any
  sortCompanyList: any
  selectCompany: any
  getUserIssues: any
  getCompanyInfo: any
}

class QuadsContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchCompanyList,
      getUserIssues,
    } = this.props;

    // Grabs user issues from user store and adds to company store
    getUserIssues();
    // Fetch company list from db and adds to company store
    fetchCompanyList();
  }

  render() {
    // Extract state to props
    const {
      companyList,
      getCompanyInfo,
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
            list={companyList}
            select={selectCompany}
            selected={selectedCompany}
            selectedData={selectedCompanyData}
            sort={sortCompanyList}
            info={getCompanyInfo}
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
  getCompanyInfo: (event: any, ticker: string) => {
    event.preventDefault();
    dispatch(actions.getCompanyInfo(ticker));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(QuadsContainer);
