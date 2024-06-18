import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <img 
        src="./abhiTrainings-logo-white.png" 
        alt='logo' 
        className="logo" 
      />
      <ul className="navItems">
        <li><NavLink className="navItem" activeClassName="active" exact to="/home">Home</NavLink></li>
        <li><NavLink className="navItem" activeClassName="active" exact to="/courses">Courses</NavLink></li>
        <li><NavLink className="navItem" activeClassName="active" exact to="/about">About Us</NavLink></li>
        <li><NavLink className="navItem" to="/login">Login</NavLink></li>
        <li><NavLink className="navItem" to="/signup">Signup</NavLink></li>
      </ul>
    </div>
  );
};

export default Navbar;
