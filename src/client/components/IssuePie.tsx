/**
 * @module IssuePieChart.tsx
 * @description Single Issue Display Component
 */

import * as React from 'react';
import { Component } from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';


interface Props {
  info: any
  modal?: any
  politician?: any
}

class IssuePie extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  render() {

    const { name, alignedScore } = this.props.info;
    console.log('aligned score: ', alignedScore);
    let display;

    if (!alignedScore) {
      display = (
        <ResponsiveContainer>
          <PieChart width={100} height={100}>
            <Pie
              data={[{ name: name, value: 100 }]}
              outerRadius="100%"
              innerRadius="70%"
              fill="#808080"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              paddingAngle={5}
            >
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      const COLORS: string[] = ['#A5A8A6', (
        alignedScore >= 70 ? '#16C33F' : alignedScore >= 40 ? '#FAEB00' : '#FA2929'
      )];

      const DATA: any = [
        {
          name: "",
          value: 100 - alignedScore
        },
        {
          name: name,
          value: alignedScore
        }
      ];

      display = (
        <ResponsiveContainer>
          <PieChart width={100} height={100}>
            <Pie
              data={DATA}
              outerRadius="100%"
              innerRadius="70%"
              fill="#808080"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              paddingAngle={5}>
              {
                DATA.map((_: any, i: number) => <Cell fill={COLORS[i % COLORS.length]} />)
              }
              <Label value={alignedScore === 0 ? '10%' : `${alignedScore}%`} position="center" fill="white" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <div className="issue-box">
        <div className="issue-pie" id={name}>
          {display}
          <p>{name}</p>
        </div>
      </div>
    );
  }
}

export default IssuePie;
