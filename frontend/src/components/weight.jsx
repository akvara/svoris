import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import First from './placeholder/first'
import Second from './placeholder/second'
import Third from './placeholder/third'

const Pressure = () => (
  <div className="main-content page">
    <div className="weight-header group">
      <h2>Svoris</h2>
      <ul className="page-nav">
        <li><NavLink to='/weight/input'>Įvedimas</NavLink></li>
        <li><NavLink to='/weight/chart'>Grafikas</NavLink></li>
        <li><NavLink to='/weight/data'>Duomenys</NavLink></li>
      </ul>
    </div>

    <Route path='weight/input' component={First} />
    <Route path='weight/chart' component={Second} />
    <Route path='weight/data' component={Third} />
  </div>
);

export default Pressure;