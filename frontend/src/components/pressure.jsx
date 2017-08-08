import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import First from './placeholder/first'
import Second from './placeholder/second'
import Third from './placeholder/third'

const Pressure = () => (
  <div className="main-content page">
    <div className="pressure-header group">
      <h2>Spaudimas</h2>
      <ul className="page-nav">
        <li><NavLink to='/pressure/input'>Įvedimas</NavLink></li>
        <li><NavLink to='/pressure/chart'>Grafikas</NavLink></li>
        <li><NavLink to='/pressure/data'>Duomenys</NavLink></li>
      </ul>
    </div>

    <Route path='pressure/input' component={First} />
    <Route path='pressure/chart' component={Second} />
    <Route path='pressure/data' component={Third} />
  </div>
);

export default Pressure;