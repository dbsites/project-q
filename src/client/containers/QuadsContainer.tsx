/**
 * @module QuadsContainer.tsx
 * @description Quads Container for User Dashboard
 */

import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionCreators'

import Header from '../containers/HeaderContainer';
import QuadsDisplay from '../components/QuadsDisplay';

import '../assets/QuadsContainer.css';

interface Props {
  selectedCompany: any
  companyList: any
  sortCompanyList: any
  selectCompany: any
  getUserIssues: any
  userIssues: any
}

class QuadsContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchCompanyList,
      getUserIssues
    } = this.props as any;

    fetchCompanyList();
    getUserIssues();
    return;
  }

  render() {
    const {
      companyList,
      selectCompany,
      selectedCompany,
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
            sort={sortCompanyList}
            issues={userIssues}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
  selectedCompany: state.company.selectedCompany,
  userIssues: state.company.userIssues,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(QuadsContainer);
