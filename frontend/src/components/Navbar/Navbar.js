import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaBell } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import './Navbar.css';
import Announcements from '../Announcements/Announcements'; // Import the announcements page

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const dropdownRef = useRef(null);
  const announcementsRef = useRef(null);
  const userInfo = useContext(UserContext);
  const { user, setUser } = userInfo;
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAnnouncements = () => {
    setShowAnnouncements((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:1234/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (showAnnouncements && announcementsRef.current && !announcementsRef.current.contains(event.target)) {
        setShowAnnouncements(false); // Close announcements on outside click
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAnnouncements]);

  return (
    <div className="navbarContainer">
      <img 
        src="https://i.ibb.co/3Tv149f/image.png" 
        alt="logo" 
        className="logo" 
      />
      <div className="hamburger" onClick={toggleNav}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navItems ${isOpen ? 'open' : ''}`}>
  {user ? (
    // Show these items when the user is logged in
    <>
      <li><NavLink className="navItem" activeclassname="active" to="/home" onClick={toggleNav}>Home</NavLink></li>
      <li><NavLink className="navItem" activeclassname="active" to="/courses" onClick={toggleNav}>Courses</NavLink></li>
      <li className="notificationItem">
        <FaBell className="notificationIcon" onClick={toggleAnnouncements} />
      </li>
      <li className="profileItem" ref={dropdownRef}>
        <img src={user.profileImg} alt="Profile" className="profileImg" onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className="dropdownMenu">
            <div><NavLink className="dropdownItem" to="/profile" onClick={toggleNav}>My Profile</NavLink></div>
            <div><span className="dropdownItem" onClick={handleLogout}>Log out</span></div>
          </div>
        )}
      </li>
      <li className="hamburgerProfileItem mobile">
        <NavLink className="navItem" to="/profile" onClick={toggleNav}>My Profile</NavLink>
      </li>
      <li className="hamburgerProfileItem mobile logoutButton">
        <span className="navItem" onClick={handleLogout}>Logout</span>
      </li>
    </>
  ) : (
    // Show these items when the user is not logged in
    <>
      <li><NavLink className="navItem" activeclassname="active" to="/" onClick={toggleNav}>Home</NavLink></li>
      <li><NavLink className="navItem" activeclassname="active" to="/courses" onClick={toggleNav}>Courses</NavLink></li>
      <li><NavLink className="navItem" activeclassname="active" to="/about" onClick={toggleNav}>About Us</NavLink></li>
      <li><NavLink className="navItem" to="/login" onClick={toggleNav}>Login</NavLink></li>
    </>
  )}
</ul>


      {/* Sliding Announcements Page */}
      {showAnnouncements && (
      <>
        <div className="announcementsOverlay" onClick={toggleAnnouncements}></div>
        <div className={`announcementsSlide ${showAnnouncements ? 'show' : ''}`} ref={announcementsRef}>
          <Announcements onClose={toggleAnnouncements} />
        </div>
      </>
    )}
    </div>
  );
};

export default Navbar;
