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

// let display;

class OverviewPie extends Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { overall } = this.props;
    const diff = 100 - overall;

    const COLORS: string[] = ['#3A3A3A', (
      overall >= 70 ? '#4ece98' : overall >= 40 ? '#e5e436' : '#ec566c'
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
            animationEasing={'ease'}
          >
            {
              DATA.map((_: any, i: number) => <Cell fill={COLORS[i % COLORS.length]} key={i} />)
            }
            <Label value={overall + '%'} position="center" fill="white" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default OverviewPie;