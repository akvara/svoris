import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Chart extends React.Component {

  render() {
      return (
          <LineChart width={800} height={300} data={this.props.items} margin={{top: 5, right: 5, left: 5, bottom: 5}}>
          <XAxis dataKey="for_date"/>
          <YAxis domain={['auto', 'auto']} />
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="sys" stroke="#621b9d" />
          <Line type="monotone" dataKey="dia" stroke="#a27f0d" />
          <Line type="monotone" dataKey="pul" stroke="#82ca9d" />
          </LineChart>
      );
  }
}

export default Chart;
