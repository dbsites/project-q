/**
 * @module IssuePieChart.tsx
 * @description Single Issue Display Component
 */

import * as React from 'react';
import { Component } from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import IssueDetail from './IssueDetail';

// TODO when store structure finalized
interface Props {
  info: any;
  logo?: any;
  modal?: any;
  polit?: any;
  detailedView?: any;
  handleMouseEnter?: any;
  handleMouseLeave?: any;
}

// TODO when store structure finalized
class IssuePie extends Component<Props> {
  render() {
    const { name, alignedScore } = this.props.info;
    const {
      handleMouseEnter,
      handleMouseLeave,
      detailedView,
      logo
    } = this.props;
    let blurb, display, companyName;

    if (this.props.modal) {
      const {
        aggregate_amount,
        recip_1,
        recip_1_amount,
        recip_2,
        recip_2_amount,
        recip_3,
        recip_3_amount
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
        company_name
      } = this.props.modal;

      companyName = this.props.modal.company_name;

      const searchName = name.split(' ')[0].toUpperCase();

      switch (searchName) {
        case 'MONEY':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            aggregate_amount,
            recip_1,
            recip_1_amount,
            recip_2,
            recip_2_amount,
            recip_3,
            recip_3_amount
          );
          break;
        case 'ENVIRONMENT':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            green_buildings,
            targets_emissions
          );
          break;
        case "CIVIL/WOMEN'S":
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            human_rights,
            policy_board_diversity,
            women_managers
          );
          break;
        case '2ND':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            nra_score,
            brady_rating,
            yes_manchin,
            no_manchin
          );
          break;
        case 'EXECUTIVE':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            tsr,
            salary_gap
          );
          break;
        case 'CORPORATE':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            community_score,
            charity_amount
          );
          break;
        case 'DRUG':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            norml_score
          );
          break;
        case 'HEALTH':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            yes_repeal,
            no_repeal
          );
          break;
        case 'IMMIGRATION':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            diversity_score,
            aila_score,
            fair_score
          );
          break;
        case 'TAXES':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            yes_tax_cut,
            no_tax_cut
          );
          break;
        case 'PRESIDENTIAL':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            trump_alignment
          );
          break;
        case 'ECONOMY':
          blurb = IssueScripts[name](
            company_name,
            alignedScore,
            name,
            taxes_paid
          );
          break;
      }
    }

    if (!alignedScore) {
      display = (
        <ResponsiveContainer>
          <PieChart width={100} height={100}>
            <Pie
              data={[{ value: 100 }, { value: alignedScore }]}
              outerRadius="100%"
              innerRadius="70%"
              fill="#808080"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              onMouseEnter={handleMouseEnter}
              paddingAngle={5}
            >
              <Cell fill="#3A3A3A" />
              <Label
                value={
                  alignedScore === 0
                    ? '0%'
                    : alignedScore === undefined
                    ? '0%'
                    : `${alignedScore}%`
                }
                position="center"
                fill="white"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      const COLORS: string[] = [
        '#3A3A3A',
        alignedScore >= 70
          ? '#16C33F'
          : alignedScore >= 40
          ? '#FAEB00'
          : '#FA2929'
      ];

      const DATA: any = [
        {
          name: '',
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
                data={[{ value: 100 - alignedScore }, { value: alignedScore }]}
                outerRadius="100%"
                innerRadius="70%"
                fill="#808080"
                dataKey="value"
                startAngle={90}
                endAngle={450}
                paddingAngle={5}
                animationEasing="ease-in-out"
              >
                {DATA.map((_: any, i: number) => (
                  <Cell fill={COLORS[i % COLORS.length]} />
                ))}
                <Label
                  value={alignedScore === 0 ? '0%' : `${alignedScore}%`}
                  position="center"
                  fill="white"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {detailedView && (
            <IssueDetail
              polit={this.props.polit}
              company={companyName}
              blurb={blurb}
              logo={logo}
              name={name}
              score={alignedScore}
            />
          )}
        </React.Fragment>
      );
    }

    return (
      <div
        className="issue-box"
        key={name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="issue-pie" key={name} id={name.split(' ').join('-')}>
          {display}
          <p>{name}</p>
        </div>
      </div>
    );
  }
}

export default IssuePie;

/**
 *
 * ISSUE SCRIPT GENERATORS
 *
 */

export const MONEY = (
  companyName: string,
  score: number,
  issueName: string,
  aggregate: number,
  recip_1: string,
  recip_1_amount: number,
  recip_2: string,
  recip_2_amount: number,
  recip_3: string,
  recip_3_amount: string
) => {
  const recip1: any = recip_1.split(' ');
  recip1.pop();
  recip_1 = recip1.join(' ');

  const recip2: any = recip_2.split(' ');
  recip2.pop();
  recip_2 = recip2.join(' ');

  const recip3: any = recip_3.split(' ');
  recip3.pop();
  recip_3 = recip3.join(' ');

  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your input is cross-referenced
        with data tracking expenditures to federal candidates, incumbents and
        political parties. In 2016, <span>{companyName}</span> contributed{' '}
        <span>{aggregate}</span>. The top three recipients were{' '}
        <span>{recip_1}</span> (<span>{recip_1_amount}</span>),{' '}
        <span>{recip_2}</span> (<span>{recip_2_amount}</span>), and{' '}
        <span>{recip_3}</span> (<span>{recip_3_amount}</span>
        ).
      </p>
    </div>
  );
};

export const ENVIRONMENT = (
  companyName: string,
  score: number,
  issueName: string,
  greenBuildings: string,
  targetEmissions: string
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including whether{' '}
        <span>{companyName}</span> has committed to green building practices (
        <span>{greenBuildings}</span>) and targeting emissions (
        <span>{targetEmissions}</span>). In addition, Ethiq factors in corporate
        expenditures to politicians who advocate for and against environment
        regulations.
      </p>
    </div>
  );
};

export const CIVIL = (
  companyName: string,
  score: number,
  issueName: string,
  humanRightsScore: number,
  policyBoardDiversity: string,
  womenManagers: number
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> Human Rights Rating (
        <span>{humanRightsScore}</span>), whether it has a policy on Board
        Diversity (<span>{policyBoardDiversity}</span>) and its percentage of
        women in managerial positions (<span>{womenManagers}</span>).
      </p>
    </div>
  );
};

export const SECOND = (
  companyName: string,
  score: number,
  issueName: string,
  nraScore: number,
  bradyRating: number,
  yesManchin: string,
  noManchin: string
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> hybrid NRA score of <span>{nraScore}</span>
        , it's hybrid Brady rating of <span>{bradyRating}</span>, and aggregate
        money given by <span>{companyName}</span> to those who voted YES on the
        S.715-Manchin-Toomey Amdt. (<span>{yesManchin}</span>) vs. those who
        voted NO (<span>{noManchin}</span>)
      </p>
    </div>
  );
};

export const SALARY = (
  companyName: string,
  score: number,
  issueName: string,
  TSR: string,
  salaryGap: number
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> CEO compensation is linked to total
        shareholder return (<span>{TSR}</span>), the salary gap ratio between
        executives and the average worker (<span>{salaryGap}</span>-to-1),
        employee satisfaction, strikes, etc.
      </p>
    </div>
  );
};

export const CORPORATE = (
  companyName: string,
  score: number,
  issueName: string,
  communityScore: number,
  charityAmount: string
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> community score of{' '}
        <span>{communityScore}</span>, representing its charitable and volunteer
        work, the overall amount of money given to charity during the year (
        <span>{charityAmount}</span>), charitable contributions as a percentage
        of revenue, etc.`
      </p>
    </div>
  );
};

export const DRUG = (
  companyName: string,
  score: number,
  issueName: string,
  normlScore: any
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> campaign donations to politicians in favor
        or opposition of drug reform, its hybrid NORML (National Organization
        for the Reform of Marijuana Laws) score of <span>{normlScore}</span>,
        and additional metrics.
      </p>
    </div>
  );
};

export const HEALTH = (
  companyName: string,
  score: number,
  issueName: string,
  yesRepeal: string,
  noRepeal: string
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> aggregate expenditures to those who voted
        YES to repeal the Affordable Care Act (<span>{yesRepeal}</span>) vs.
        those who voted NO (<span>{noRepeal}</span>).
      </p>
    </div>
  );
};

export const IMMIGRATION = (
  companyName: string,
  score: number,
  issueName: string,
  diversityScore: number,
  ailaScore: number,
  fairScore: number
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> overall diversity score (
        <span>{diversityScore}</span>), hybrid scores based on American
        Immigration Lawyers Association rankings (<span>{ailaScore}</span>), the
        Federation for American Immigration Reform rankings (
        <span>{fairScore}</span>) and other metrics.
      </p>
    </div>
  );
};

export const TAXES = (
  companyName: string,
  score: number,
  issueName: string,
  yesTaxCut: string,
  noTaxCut: string
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> aggregate expenditures to those who voted
        YES on the 2017 Tax Cut and Jobs Act (<span>{yesTaxCut}</span>) vs.
        those who voted NO (<span>{noTaxCut}</span>). In addition, hybrid scores
        from the Club for Growth and the National Taxpayers Union were
        considered.
      </p>
    </div>
  );
};

export const PRESIDENTIAL = (
  companyName: string,
  score: number,
  issueName: string,
  trumpAlignment: string
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. This is based on{' '}
        <span>{companyName}'s</span> expenditures to politicians voting in line
        with or in opposition of President Trump, donations to his campaign,
        etc. <span>{trumpAlignment}</span> of the <span>{companyName}'s</span>{' '}
        political financing goes to legislators who votes are aligned with the
        current administration.
      </p>
    </div>
  );
};

export const ECONOMY = (
  companyName: string,
  score: number,
  issueName: string,
  taxesPaid: string
) => {
  return (
    <div className="blurb">
      <p className="blurb-paragraph">
        <span>{companyName}</span> has received a score of <span>{score}</span>{' '}
        on the issue of <span>{issueName}</span>. Your unique input on Ethiq’s
        quiz has been cross-referenced with data points including{' '}
        <span>{companyName}'s</span> value to overall GDP, historical net hiring
        vs. layoffs, taxes paid as a percentage of revenue (
        <span>{taxesPaid}</span>), etc.
      </p>
    </div>
  );
};

const IssueScripts: any = {
  'Money and Politics': MONEY,
  Environment: ENVIRONMENT,
  "Civil/Women's Rights": CIVIL,
  '2nd Amendment': SECOND,
  'Executive Compensation': SALARY,
  'Corporate Philanthropy': CORPORATE,
  'Drug Legalization': DRUG,
  'Health Care': HEALTH,
  Immigration: IMMIGRATION,
  Taxes: TAXES,
  'Presidential Support': PRESIDENTIAL,
  'Economy and Jobs': ECONOMY
};
