import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header>
    <ul className="main-nav">
      <li><NavLink exact to="/">Pirmas</NavLink></li>
      <li><NavLink to="/weight">Svoris</NavLink></li>
      <li><NavLink to="/pressure">Spaudimas</NavLink></li>
    </ul>
  </header>
);

export default Header;