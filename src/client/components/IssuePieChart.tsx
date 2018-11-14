/**
 * @module IssuePieChart.tsx
 * @description Single Issue Display Component
 */

import * as React from 'react';

import { PieChart } from 'react-easy-chart';

import '../assets/IssueDisplay.css';

const IssueDisplay = (props: any) => {

  let display;

  if (!props.info.agreeScore) {
    display
  }
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
        // styles={{
        //   '.chart_text': {
        //     fontFamily: 'serif',
        //     fontSize: '1.2em',
        //     fill: '#ffffff'
        //   }
        // }}
        data={[
          { key: agreeScore, value: agreeScore || 100, color: '#005005' },
          { key: disagreeScore, value: disagreeScore || 0, color: '#8e0000' }
        ]}
      />
      <p>{name}</p>
    </div>
  );
}


export default IssueDisplay;
