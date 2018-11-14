/**
 * @module IssuePieChart.tsx
 * @description Single Issue Display Component
 */

import * as React from 'react';

import { PieChart } from 'react-easy-chart';

import '../assets/IssueDisplay.css';

const IssueDisplay = (props: any) => {
  const {
    name,
    // leaning,
    agreeScore,
    disagreeScore
  } = props.info;

  console.log('issue display:', name, agreeScore, disagreeScore)

  return (
    <div className="issue-box">
      <PieChart
        labels
        size={100}
        styles={{
          '.chart_text': {
            fontFamily: 'serif',
            fontSize: '1.2em',
            fill: '#ffffff'
          }
        }}
        data={[
          { key: 'Agree', value: agreeScore, color: '#005005' },
          { key: 'Disagree', value: disagreeScore, color: '#8e0000' }
        ]
        }
      />
      <p>{name}</p>
    </div>
  );
}


export default IssueDisplay;
