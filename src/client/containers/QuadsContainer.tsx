/**
 * @module QuadsContainer.tsx
 * @description Quads Container for User Dashboard
 */

import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionCreators'

import QuadsDisplay from '../components/QuadsDisplay';

import '../assets/QuadsContainer.css';

interface Props {
  selectedCompany: any
  companyList: any
  sortCompanyList: any
  selectCompany: any
}

class QuadsContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { fetchCompanyList } = this.props as any;
    return fetchCompanyList();
  }

  render() {
    const {
      companyList,
      selectCompany,
      selectedCompany,
      sortCompanyList } = this.props;

    return (
      <div id="quads-container">
        <QuadsDisplay
          list={companyList}
          select={selectCompany}
          selected={selectedCompany}
          sort={sortCompanyList}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  companyList: state.company.companyList,
  selectedCompany: state.company.selectedCompany
});

const mapDispatchToProps = (dispatch: any): any => ({
  fetchCompanyList: () => dispatch(actions.fetchCompanyList()),
  selectCompany: (event: any) => dispatch(actions.selectCompany({ field: event.target.id })),
  sortCompanyList: (event: any) => dispatch(actions.sortCompanyList({ field: event.target.id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuadsContainer);
