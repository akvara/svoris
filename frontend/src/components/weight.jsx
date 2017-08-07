import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import HTML from './courses/HTML'
import CSS from './courses/CSS'
import JavaScript from './courses/JavaScript'

const Weight = () => (
  <div className="main-content courses">
    <div className="course-header group">
      <h2>Svoris</h2>
      <ul className="course-nav">
        <li><NavLink to='/courses/html'>Įvedimas</NavLink></li>
        <li><NavLink to='/courses/css'>Grafikas</NavLink></li>
        <li><NavLink to='/courses/javascript'>Duomenys</NavLink></li>
      </ul>
    </div>

    <Route path='courses/html' component={HTML} />
    <Route path='courses/css' component={CSS} />
    <Route path='courses/javascript' component={JavaScript} />
  </div>
);

export default Weight;