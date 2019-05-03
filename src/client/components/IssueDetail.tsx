import * as React from "react";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";

const IssueDetail: any = (props: any) => {
  let display;

  if (props.polit) {
    const COLORS = [
      "grey",
      props.score >= 70 ? "#43B188" : props.score >= 40 ? "#e5e436" : "#ec566c"
    ];

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
        <PieChart width={200} height={200}>
          <Pie
            data={DATA}
            outerRadius="70%"
            innerRadius="70%"
            fill="#808080"
            dataKey="value"
            startAngle={90}
            endAngle={450}
            paddingAngle={5}
          >
            {DATA.map((_: any, i: number) => (
              <Cell fill={COLORS[i % COLORS.length]} />
            ))}
            <Label value={props.score + "%"} position="center" fill="white" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="issue-detail">
      <div className="modal-left">
        <div className="pie-detail">{display}</div>
        <h4>{props.name.toUpperCase()}</h4>
      </div>
      <div className="modal-right">
        <img src={props.logo} id="company-logo" />
        <p className="issue-description">{props.blurb}</p>
      </div>
    </div>
  );
};

export default IssueDetail;
