import * as React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import '../assets/IssuePie.css'


const IssueDetail: any = (props: any) => {

  let display, politicians;

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
        <PieChart width={200} height={200} >
          <Pie
            data={DATA}
            outerRadius="100%"
            innerRadius="70%"
            fill="#808080"
            dataKey="value"
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
      <img src={props.logo} id="company-logo" />
      <div className="pie-detail">{display}</div>
      <h3>{props.name}</h3>

      <p className="issue-description">{props.blurb}</p>
      <h4>Top Three Political Recipients:</h4>
      <div className="row">
        {politicians}
      </div>
    </div>
  )
}

export default IssueDetail;