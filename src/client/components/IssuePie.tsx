/**
 * @module IssuePieChart.tsx
 * @description Single Issue Display Component
 */

import * as React from 'react';
import { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import IssueDetail from './IssueDetail';



import '../assets/IssuePie.css';

interface Props {
  info: any
}

class IssuePie extends Component<Props> {
  state:any ;
  constructor(props: any) {
    console.log(props)
    super(props);
    this.state = {
      detailedView: false
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter() {
    this.setState({detailedView: true})
  }

  handleMouseLeave() {
    this.setState({detailedView: false})
  }
  
  render() {
    const { name, alignedScore } = this.props.info;

    let display;

    if (!alignedScore) {
      display = (
        <ResponsiveContainer>
          <PieChart width={100} height={100}>
            <Pie
              data={[{ name: name, value: 100 }]}
              outerRadius="100%"
              fill="#808080"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              onMouseEnter={this.handleMouseEnter}
              
              />
            {/* </Pie> */}
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      console.log('alignedScore: ', alignedScore);
      const COLORS: string[] = ['#000000', (
        alignedScore >= 60 ? '#436F4D' : alignedScore >= 50 ? '#898A40' : '#6F4343'
      )];

      const DATA: any = [
        {
          name: "",
          value: 100 - alignedScore
        },
        {
          name: "Aligned",
          value: alignedScore
        }
      ];
    

      display = (
        <ResponsiveContainer>
          <PieChart width={100} height={100}>
            <Pie
              data={DATA}
              outerRadius="100%"
              fill="#808080"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              onMouseEnter={this.handleMouseEnter}
              >
              {
                DATA.map((_: any, i: number) => <Cell fill={COLORS[i % COLORS.length]} />)
              }
              
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <div className="issue-box">
        <div className="issue-pie">
          {display}
          {this.state.detailedView && <IssueDetail handleMouseLeave={this.handleMouseLeave}/>}
        </div>
        <p>{name}</p>
      </div>
    );
  }
}

export default IssuePie;
