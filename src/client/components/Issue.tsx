/**
 * @module Issue.tsx
 * @description Issue Card Presentation Component
 */

import * as React from 'react';

const Issue = (props: any) => {
  const { issue, issueId, remaining, toggleIssue } = props;

  const issueCard = (
    <React.Fragment >
      <span className="issue-card-text">{issue.name}</span>
    </React.Fragment>
  );

  const issueDivSelected = (
    <div className="issue-card issue-card-selected" onClick={() => toggleIssue(issueId)}>
      {issueCard}
    </div>
  );

  const issueDivNotSelected = remaining ?
  (
    <div className="issue-card" onClick={() => toggleIssue(issueId)}>
      {issueCard}
    </div>
  ) : 
  (
    <div className="issue-card issue-card-unavailable">
    {issueCard}
  </div>
  );

  const issueDiv = issue.selected ? issueDivSelected : issueDivNotSelected;

  return issueDiv;
};

export default Issue;
