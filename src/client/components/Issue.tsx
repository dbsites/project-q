/**
 * @module Issue.tsx
 * @description Issue Card Presentation Component
 */

 import * as React from 'react';

const Issue = (props: any) => {
  const { issue, remaining, toggleIssue } = props;

  const issueCard = (
    <React.Fragment >
      <div className="issue-card-header">{issue.name}</div>
      <div className="issue-card-blurb">{issue.blurb}</div>
    </React.Fragment>
  );

  const issueDivSelected = (
    <div className="issue-card issue-card-selected">
      {issueCard}
      <input className="issue-card-button" onClick={() => toggleIssue(issue.name)} type="submit" value="Clear" />
    </div>
  );

  const issueDivNotSelected = remaining ?
  (
    <div className="issue-card">
      {issueCard}
      <input className="issue-card-button" onClick={() => toggleIssue(issue.name)} type="submit" value="Select" />
    </div>
  ) : 
  (
    <div className="issue-card issue-card-unavailable">
    {issueCard}
    <input className="issue-card-button" type="submit" value="Select" />
  </div>
  );

  const issueDiv = issue.selected ? issueDivSelected : issueDivNotSelected;

  return issueDiv;
};

export default Issue;
