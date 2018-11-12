/**
 * @module IssuesContainer.tsx
 * @description Issues Ranking Container - User Onboarding
 */

import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionCreators';

import { getSelectedIssueCount } from '../reducers/userReducer';

// Import Presentation Components
import Header from '../containers/HeaderContainer';
import Issue from '../components/Issue';

const IssuesContainer = (props: any): any => {
  const {
    issues,                    // Props from issues state
    selectedIssues, userId,    // Props from user state
    addIssue, removeIssue,     // Actions from user reducer
    clearIssues, submitIssues, // Actions from user reducer
  } = props;

  const issueCount = getSelectedIssueCount(selectedIssues);
  const issuesRemaining = 6 - issueCount;
  const additional = issueCount === 0 ? '' : 'Additional ';
  
  const issuesArray: any[] = [];

  Object.keys(issues).forEach((issueId) => {
    let issue: JSX.Element;
    if (issueId in selectedIssues) {
      issue = <Issue
        issue={issues[issueId]}
        issueId={issueId}
        key={issueId}
        remaining={issuesRemaining}
        selected={true}
        toggleIssue={removeIssue}
      />
    } else {
      issue = <Issue
        issue={issues[issueId]}
        issueId={issueId}
        key={issueId}
        remaining={issuesRemaining}
        selected={false}
        toggleIssue={addIssue}
      />
    }
    issuesArray.push(issue);
  });

  const headerText = issuesRemaining ?
    `Select Up To ${6 - issueCount} ${additional} Issues That Matter Most To You` :
    `Please Click 'Submit' To Continue`;

  const footerButtons = issueCount ?
    <React.Fragment>
      <div className="dashboard-footer-button" onClick={clearIssues}>
        Clear All
      </div>
      <div className="dashboard-footer-button" onClick={() => submitIssues(userId, selectedIssues)}>
        Submit
      </div>
    </React.Fragment>
    :
    <React.Fragment>
      <div className="dashboard-footer-button invalid" >
        Clear All
      </div>
      <div className="dashboard-footer-button invalid" >
        Submit
      </div>
    </React.Fragment> ;

  return (
    <div className="main-dashboard">
      <div className="header">
        <Header />
      </div>
      <div className="dashboard-header">
        <span>
          {headerText}
        </span>
      </div>
      <div className="issue-dashboard-container">
        {issuesArray}
      </div>
      <div className="dashboard-footer">
        {footerButtons}
      </div>
    </div>
  )
};

const mapStateToProps = (store: any): any => ({
  selectedIssues: store.user.selectedIssues,
  userId: store.user.userId,
  issues: store.issues,
});

const mapDispatchToProps = (dispatch: any): any => ({
  clearIssues: () => dispatch(actions.clearIssues()),
  addIssue: (issueId: string) => dispatch(actions.addIssue(issueId)),
  removeIssue: (issueId: string) => dispatch(actions.removeIssue(issueId)),
  submitIssues: (userId: string, selectedIssues: any) => dispatch(actions.fetchSubmitIssuesRequest(userId, selectedIssues)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IssuesContainer);
