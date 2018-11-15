/**
 * @module IssuePieChart.jsx (YES, JSX)
 * @description Single Issue Display Component
 */

import * as React from 'react';

import { PieChart } from 'recharts';

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
    
        width={100} height={400} 
        data={[
          onMouseEnter: { key: 'Agree', value: agreeScore, color: '#005005' },
          { key: 'Disagree', value: disagreeScore, color: '#8e0000' }
        ]
        }
      >
        {/* <onMouse /> */}
      </PieChart>
      <p>{name}</p>
    </div>
  );
}


export default IssueDisplay;
