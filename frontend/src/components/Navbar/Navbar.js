import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userInfo = useContext(UserContext);
  const { user, setUser } = userInfo;
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:1234/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbarContainer">
      <img
        src="https://media.licdn.com/dms/image/v2/D560BAQEEDxu49xkTCw/company-logo_200_200/company-logo_200_200/0/1731404362714/tensorgo_logo?e=2147483647&v=beta&t=B47-m9NQsfE50yPXVTC4BjbNYsfadX9j5zhUm8JFnYY"
        alt="logo"
        className="logo"
        width="100px"
        height="300px"
      />
      <div className="hamburger" onClick={toggleNav}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navItems ${isOpen ? "open" : ""}`}>
        {user ? (
          // Show these items when the user is logged in
          <>
            {/* <li>
              <NavLink
                className="navItem"
                activeclassname="active"
                to="/home"
                onClick={toggleNav}
              >
                Home
              </NavLink>
            </li> */}

            <li>
              <NavLink className="navItem" to="/add-plan" onClick={toggleNav}>
                Add Plan
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navItem"
                activeclassname="active"
                to="/courses"
                onClick={toggleNav}
              >
                Courses
              </NavLink>
            </li>
            <li className="profileItem" ref={dropdownRef}>
              <img
                src={user.profileImg}
                alt="Profile"
                className="profileImg"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="dropdownMenu">
                  <div>
                    <NavLink
                      className="dropdownItem"
                      to="/profile"
                      onClick={toggleNav}
                    >
                      My Profile
                    </NavLink>
                  </div>
                  <div>
                    <span className="dropdownItem" onClick={handleLogout}>
                      Log out
                    </span>
                  </div>
                </div>
              )}
            </li>
            <li className="hamburgerProfileItem mobile">
              <NavLink className="navItem" to="/profile" onClick={toggleNav}>
                My Profile
              </NavLink>
            </li>
            <li className="hamburgerProfileItem mobile logoutButton">
              <span className="navItem" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </>
        ) : (
          // Show these items when the user is not logged in
          <>
          
            <li>
            
              <NavLink
                className="navItem"
                activeclassname="active"
                to="/courses"
                onClick={toggleNav}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink className="navItem" to="/login" onClick={toggleNav}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>

    </div>
  );
};

export default Navbar;
