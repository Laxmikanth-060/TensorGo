import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbarContainer">
      <img 
        src="https://i.ibb.co/3Tv149f/image.png" 
        alt='logo' 
        className="logo" 
      />
      <div className="hamburger" onClick={toggleNav}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navItems ${isOpen ? 'open' : ''}`}>
        <li><NavLink className="navItem" activeclassname="active" to="/home" onClick={toggleNav}>Home</NavLink></li>
        <li><NavLink className="navItem" activeclassname="active" to="/courses" onClick={toggleNav}>Courses</NavLink></li>
        <li><NavLink className="navItem" activeclassname="active" to="/about" onClick={toggleNav}>About Us</NavLink></li>
        <li><NavLink className="navItem" to="/login" onClick={toggleNav}>Login</NavLink></li>
        <li><NavLink className="navItem" to="/signup" onClick={toggleNav}>Signup</NavLink></li>
      </ul>
    </div>
  );
};

export default Navbar;
