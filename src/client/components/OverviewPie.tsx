/**
 * @module OverviewPie.tsx
 * @description Overall Pie Display Component
 */

import * as React from 'react';
import { Component } from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';

interface Props {
  overall: any
}

class OverviewPie extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { overall } = this.props;
    const diff = 100 - overall;

    const COLORS: string[] = ['#3A3A3A', (
      overall >= 70 ? '#16C33F' : overall >= 40 ? '#FAEB00' : '#FA2929'
    )];

    const DATA: any = [
      {
        name: "",
        value: diff
      },
      {
        name: "Overall",
        value: overall
      }
    ];

    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={DATA}
            outerRadius="100%"
            innerRadius="70%"
            fill="#ff0000"
            dataKey="value"
            startAngle={90}
            endAngle={450}
            paddingAngle={5}
            isAnimationActive={true}
            isUpdateAnimationActive={true}
            // animationDuration={2000}
            animationEasing={'ease'}
          >
            {
              DATA.map((_: any, i: number) => <Cell fill={COLORS[i % COLORS.length]} />)
            }
            <Label value={overall + '%'} position="center" fill="white" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default OverviewPie;