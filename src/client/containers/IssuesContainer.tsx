/**
 * @module IssuesContainer.tsx
 * @description Issues Ranking Container - User Onboarding
 */

import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';

import { getSelectedIssueCount, getSelectedIssues } from '../reducers/issuesReducer';

import Issue from '../components/Issue';

const IssuesContainer = (props: any): any => {
  const {
    issues, userId,
    clearIssues, toggleIssue,
    submitIssues,
  } = props;

  const selectedIssues = getSelectedIssues(issues);
  const issueCount = getSelectedIssueCount(issues);
  const issuesRemaining = 6 - issueCount;
  const additional = issueCount === 0 ? '' : 'Additional ';
  
  const issuesArray: any[] = [];

  Object.keys(issues).forEach((issueId) => {
    issuesArray.push(<Issue issue={issues[issueId]} issueId={issueId} key={issueId} remaining={issuesRemaining} toggleIssue={toggleIssue} />);
  });

  const headerText = issuesRemaining ?
    `Select Up To ${6 - getSelectedIssueCount(issues)} ${additional} Issues Important To You` :
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
  userId: store.user.userId,
  issues: store.issues,
});

const mapDispatchToProps = (dispatch: any): any => ({
  clearIssues: () => dispatch(actions.clearIssues()),
  toggleIssue: (issue: string) => dispatch(actions.toggleIssue(issue)),
  submitIssues: (userId: string, issuesArr: string[]) => dispatch(actions.fetchSubmitIssuesRequest(userId, issuesArr)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IssuesContainer);
