import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   }
// ];

export default class Chart extends React.PureComponent<any> {
  render() {
    if(this.props.loading) return <div style={{
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }}>
      <div>
        loading...
      </div>
    </div>;

    return (
      <div style={{width: '100%', minHeight: '144px', height: '144px'}}>
      <ResponsiveContainer>
        <LineChart
          data={this.props.data}
          // data={data}
          margin={{top: 10, right: 30}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tick={{fill: "#fff"}} dataKey="name" />
          <YAxis tick={{fill: "#fff"}}>
            <Label
              position="insideLeft"
              angle={-90}
              fill="#fff"
            >Pages of my website ($)</Label>
          </YAxis>
          <Tooltip formatter={(value) => '$ ' + value} />
          <Line type="monotone" dataKey="sp500" stroke="red" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="portfolio1" stroke="#399bf0" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#399bf0" activeDot={{ r: 8 }} /> */}
          {/* <Line type="monotone" dataKey="pv" stroke="red" activeDot={{ r: 8 }} /> */}
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
