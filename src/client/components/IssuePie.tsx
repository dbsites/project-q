/**
 * @module IssuePieChart.tsx
 * @description Single Issue Display Component
 */

import * as React from 'react';
import { Component } from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import IssueDetail from './IssueDetail';


import IssueScripts from '../IssueScripts';

interface Props {
  info: any
  modal?: any
  polit?: any
}

class IssuePie extends Component<Props> {
  render() {
    const { name, alignedScore } = this.props.info;
    let blurb, display;

    if (this.props.modal) {

      const {
        aggregate_amount,
        recip_1,
        recip_1_amount,
        recip_2,
        recip_2_amount,
        recip_3,
        recip_3_amount, 
      } = this.props.polit;

      const {
        green_buildings,
        targets_emissions,
        human_rights,
        policy_board_diversity,
        women_managers,
        nra_score,
        brady_rating,
        tsr,
        salary_gap,
        community_score,
        charity_amount,
        yes_manchin,
        no_manchin,
        yes_repeal,
        no_repeal,
        yes_tax_cut,
        no_tax_cut,
        diversity_score,
        aila_score,
        fair_score,
        taxes_paid,
        trump_alignment,
        norml_score,
        company_name,
      } = this.props.modal;

      const searchName = name.split(' ')[0].toUpperCase();

      switch (searchName) {
        case "MONEY":
          blurb = IssueScripts[name](company_name, alignedScore, name, aggregate_amount, recip_1, recip_1_amount, recip_2, recip_2_amount, recip_3, recip_3_amount);
          break;
        case "ENVIRONMENT":
          blurb = IssueScripts[name](company_name, alignedScore, name, green_buildings, targets_emissions);
          break;
        case "CIVIL/WOMEN'S":
          blurb = IssueScripts[name](company_name, alignedScore, name, human_rights, policy_board_diversity, women_managers);
          break;
        case "2ND":
          blurb = IssueScripts[name](company_name, alignedScore, name, nra_score, brady_rating, yes_manchin, no_manchin);
          break;
        case "EXECUTIVE":
          blurb = IssueScripts[name](company_name, alignedScore, name, tsr, salary_gap);
          break;
        case "CORPORATE":
          blurb = IssueScripts[name](company_name, alignedScore, name, community_score, charity_amount);
          break;
        case "DRUG":
          blurb = IssueScripts[name](company_name, alignedScore, name, norml_score);
          break;
        case "HEALTH":
          blurb = IssueScripts[name](company_name, alignedScore, name, yes_repeal, no_repeal);
          break;
        case "IMMIGRATION":
          blurb = IssueScripts[name](company_name, alignedScore, name, diversity_score, aila_score, fair_score);
          break;
        case "TAXES":
          blurb = IssueScripts[name](company_name, alignedScore, name, yes_tax_cut, no_tax_cut);
          break;
        case "PRESIDENTIAL":
          blurb = IssueScripts[name](company_name, alignedScore, name, trump_alignment);
          break;
        case "ECONOMY":
          blurb = IssueScripts[name](company_name, alignedScore, name, taxes_paid);
          break;
      }
      
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
        <React.Fragment>
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
                onMouseEnter={this.props.handleMouseEnter}
                paddingAngle={5}>
                {
                  DATA.map((_: any, i: number) => <Cell fill={COLORS[i % COLORS.length]} />)
                }
                <Label value={alignedScore === 0 ? '10%' : `${alignedScore}%`} position="center" fill="white" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {this.props.detailedView && <IssueDetail
            polit={this.props.polit}
            company={company_name}
            blurb={blurb}
            name={name}
            score={alignedScore}
            handleMouseLeave={this.props.handleMouseLeave}
          />}
        </React.Fragment>
      );
    }

    else {
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
              onMouseEnter={this.handleMouseEnter}
              paddingAngle={5}
              />
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
