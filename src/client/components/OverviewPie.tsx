/**
 * @module OverviewPie.tsx
 * @description Overall Pie Display Component
 */

import * as React from 'react';
import { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

    const COLORS: string[] = ['#000000', (
      overall >= 70 ? '#436F4D' : overall >= 69 ? '#898A40' : '#6F4343'
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
        <PieChart width={400} height={400}>
          <Pie
            data={DATA}
            outerRadius="100%"
            fill="#ff0000"
            dataKey="value"
            startAngle={90}
            endAngle={450}>
            {
              DATA.map((_: any, i: number) => <Cell fill={COLORS[i % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default OverviewPie;