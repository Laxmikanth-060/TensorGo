import React, { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ErrorMessage from "../shared/ErrorMessage";
import Loader from "../shared/Loader";
import EmailSentPopup from "../EmailVerify/EmailSentPopup";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:1234";
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
       await axios.post(`${url}/api/auth/signup`, {
        username,
        email,
        password,
      });
      setLoading(false);
      setShowPopup(true); 
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault(); 

    alert('Verification email resent successfully');

    try {
   
     const data = await axios.post(`${url}/api/auth/emailresend`, {
        username,
        email,
      });

      if(data.data.message==="Email Verification done Successfully")
      alert("Verification done Successfully. Login to continue..");

    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <div className={styles.signup_container}>
      {loading && <Loader />}
      <div className={styles.signup_form_container}>
        <div className={styles.signup_left}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.back_button}
          >
            <IoArrowBack size={24} />
          </button>
          <div className={styles.logo_title_container}>
            <h1 className={styles.signup_title}>Sign Up</h1>
          </div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <form className={styles.signup_form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.signup_input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.signup_input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.signup_input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.signup_input}
            />
            <button type="submit" className={styles.signup_green_btn}>
              Sign Up
            </button>
            <span className={styles.signin_text}>
              Already have an account? <Link to="/signin">Sign in</Link>
            </span>
          </form>
        </div>
        <div className={styles.signup_right}>
          <img
            src="./assets/tensorgo-logo.png"
            alt="tensorgo"
            className={styles.signup_right_img}
          />
          <Link to="/login">
            <button type="button" className={styles.signup_white_btn}>
              Log In
            </button>
          </Link>
        </div>
      </div>
      <EmailSentPopup
        show={showPopup}
        onResend={handleResend}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default Signup;
