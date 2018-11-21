import * as React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import '../assets/IssuePie.css'
//import { PromiseAdapter } from 'pg-promise';
//import '../assets/Mike-G.png';

// const mikeimage = require('../assets/Mike.png');
// const billImage = require('../assets/Bill.png');
// const rogerImage = require('../assets/Roger.png');

const IssueDetail: any = (props: any) => {
  let display, politicians;

  console.log('props in issuedetail: ', props);

  if (props.polit) {
    const {
      recip_1,
      recip_1_amount,
      recip_1_img,
      recip_2,
      recip_2_amount,
      recip_2_img,
      recip_3,
      recip_3_amount,
      recip_3_img,
    } = props.polit;
  
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
  
    display = (
        <ResponsiveContainer>
          <PieChart width={100} height={100} >
            <Pie
              data={DATA}
              outerRadius="100%"
              innerRadius="70%"
              fill="#808080"
              dataKey="value"
              //label={scoreLabel}
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

    politicians = (
      <React.Fragment>
        <div><img className="images" src={recip_1_img} /><p>{recip_1}</p><p>{recip_1_amount}</p></div>
        <div><img className="images" src={recip_2_img} /><p>{recip_2}</p><p>{recip_2_amount}</p></div>
        <div><img className='images' src={recip_3_img} /><p>{recip_3}</p><p>{recip_3_amount}</p></div>
      </React.Fragment>
    );
  }
  
  return (
    <div
      onMouseLeave={props.handleMouseLeave}
      className="issue-detail">
      <h1>{props.company}</h1>
      <div className="pie-detail">{display}</div>
      <h3>{props.name}</h3>

      <p className="issue-description">{props.blurb}</p>
      <h3>Top Three Politicians Donated To:</h3>
      <div className="row">
        {politicians}
      </div>
    </div>
  )
}

export default IssueDetail;