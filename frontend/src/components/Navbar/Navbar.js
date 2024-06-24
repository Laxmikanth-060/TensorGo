import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <img 
<<<<<<< HEAD
        src="https://i.ibb.co/3Tv149f/image.png" 
=======
        src="./assets/abhiTrainings-logo-white.png" 
>>>>>>> e1b1fd320aa408a73456fb0447f912041e045adb
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
