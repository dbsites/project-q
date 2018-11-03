import * as React from 'react';

const Issue = (props: any) => {
  const { issue, toggleIssue } = props;

  const issueCard = (
    <React.Fragment >
      <div className="issue-card-header">{issue.name}</div>
      <div className="issue-card-blurb">{issue.blurb}</div>
    </React.Fragment>
  );

  const issueDiv = issue.selected ?
    <div className="issue-card issue-card-selected">
      {issueCard}
      <input className="issue-card-button" onClick={() => toggleIssue(issue.name)} type="submit" value="Clear" />
    </div> :
    <div className="issue-card">
      {issueCard}
      <input className="issue-card-button" onClick={() => toggleIssue(issue.name)} type="submit" value="Select" />
    </div>;

  return issueDiv;
};

export default Issue;
