import React, { useContext } from "react";
import imgg from "./banner-icon.png";
import courseimg from "./a.jpeg";
import "./Home.css";
import { UserContext } from "../../context/UserContext";


const Home = () => {
  const { user } = useContext(UserContext);

  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div className="home">
      <div className="banner">
        <div className="banner-left">
          <div>{formattedDate}</div>
          <div>
            {user ? (
              <h1>Welcome back, {user.username}!</h1>
            ) : (
              <h1>Welcome back!</h1>
            )}
            <p>Always stay updated in your study portal</p>
          </div>
        </div>
        <div className="banner-right">
          <img src={imgg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
