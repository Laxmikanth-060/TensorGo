import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ErrorMessage from "../shared/ErrorMessage";
import Loader from "../shared/Loader";
import { UserContext } from "../../context/UserContext";
import RippleButton from "../../utils/Buttons/RippleButton";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const url = "http://localhost:1234";

  useEffect(() => {
    setError(null);
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loginResponse = await axios.post(
        `${url}/api/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { data: userData } = await axios.get(`${url}/api/auth/authCheck`, {
        withCredentials: true,
      });
      setUser(userData);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.login_container}>
      {loading && <Loader />}
      <div className={styles.login_form_container}>
        <div className={styles.login_left}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.back_button}
          >
            <IoArrowBack size={24} />
          </button>
          <div className={styles.logo_title_container}>
            <h1 className={styles.login_title}>Login</h1>
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.login_input}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.login_input}
            />
            <RippleButton type="submit" className={styles.login_green_btn}>
              Log In
            </RippleButton>
            <br />
            <span className={styles.signup_text}>
              Dont have an account?{" "}
              <Link className="signup-link" to="/signup">
                Sign Up
              </Link>
            </span>
          </form>
        </div>
        <div className={styles.login_right}>
          <img
            src="./assets/tensorgo-logo.png"
            alt="tensorgo"
            className={styles.login_right_img}
          />
          <Link to="/signup">
            <RippleButton type="button" className={styles.login_white_btn}>
              Sign Up
            </RippleButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
