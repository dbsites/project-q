import * as React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
//import { PromiseAdapter } from 'pg-promise';
//import '../assets/Mike-G.png';

const mikeimage = require('../assets/Mike.png');
const billImage = require('../assets/Bill.png');
const rogerImage = require('../assets/Roger.png');



const IssueDetail: any = (props: any) => {

  const COLORS = ['#A5A8A6', (
    props.score >= 70 ? '#16C33F' : props.score >= 40 ? '#FAEB00' : '#FA2929'
  )];

  const DATA: any = [
    {
      name: "",
      value: 100 - props.score
    },
    {
      name: "Aligned",
      value: props.score
    }
  ];

  let display = (
    <ResponsiveContainer>
      <PieChart width={100} height={100}>
        <Pie
          data={DATA}
          outerRadius="100%"
          innerRadius="70%"
          fill="#808080"
          dataKey="value"
          // label={scoreLabel}
          startAngle={90}
          endAngle={450}
          onMouseEnter={this.handleMouseEnter}
          paddingAngle={5}>

          {
            DATA.map((_: any, i: number) => <Cell fill={COLORS[i % COLORS.length]} />)
          }
          <Label value={props.score + '%'} position="center" fill="white" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
  return (
    <div 
    onMouseLeave={props.handleMouseLeave} 
    className="issue-detail">
      <h1>INTEL's VIEW</h1>
      <h3>{props.name}</h3>
        <div className="pie-detail">{display}</div>

      <p className="issue-description">"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
         ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
         esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
      <h3>Top Three Politicians Donated To:</h3>
      <div className="row">
        <div><img className="images" src={mikeimage} /><p>Mike Keller</p><p>$1,500,000</p></div>
        <div><img className="images" src={billImage} /><p>Bill Clee</p><p>$500,000</p></div>
        <div><img className='images' src={rogerImage} /><p>Roger Myer</p><p>$1,000,000</p></div>
      </div>
      <h1>$3,000,000</h1>
    </div>
  )
}

export default IssueDetail;