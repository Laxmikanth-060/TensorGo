import React, { useContext } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";
import RippleButton from "../../utils/Buttons/RippleButton.js";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="cover-image">
        <img
          src={user.coverImg || "https://via.placeholder.com/1500x400"}
          alt="Cover"
        />
      </div>

      <div className="profile-section">
        <div className="profile-left">
          <img
            src={user.profileImg || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="profile-right">
          <h2>
            <strong>{user.fullName}</strong>
          </h2>
          <p>{user.email}</p>
          <RippleButton
            className="edit-button"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </RippleButton>
        </div>
      </div>
      <div className="active-courses-section">
      </div>
    </div>
  );
};

export default Profile;
