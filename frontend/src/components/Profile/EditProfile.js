import React, { useContext, useState } from "react";
import "./EditProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";
import RippleButton from "../../utils/Buttons/RippleButton.js";

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    profileImg: user.profileImg || "",
    coverImg: user.coverImg || "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const navigate = useNavigate();

  // Function to handle image uploads to imgbb
  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "8781a1d6743760303a07331a4de14957"); // Replace with your imgbb API key

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      return response.data.data.url; // Return the image URL from imgbb
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e, setImageFile) => {
    setImageFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let profileImgUrl = formData.profileImg;
      let coverImgUrl = formData.coverImg;

      // If new profile image file is uploaded, upload to imgbb
      if (profileImageFile) {
        profileImgUrl = await uploadImageToImgbb(profileImageFile);
      }

      // If new cover image file is uploaded, upload to imgbb
      if (coverImageFile) {
        coverImgUrl = await uploadImageToImgbb(coverImageFile);
      }

      // Update the form data with the image URLs
      const updatedFormData = {
        ...formData,
        profileImg: profileImgUrl,
        coverImg: coverImgUrl,
      };

      // Submit the updated form data to the server
      const { data } = await axios.put(
        "http://localhost:1234/profile/edit",
        updatedFormData,
        {
          withCredentials: true,
        }
      );

      setUser(data); // Update user context with new data
      navigate("/profile"); // Navigate back to profile page
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setProfileImageFile)}
          />
        </div>
        <div className="form-group">
          <label>Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setCoverImageFile)}
          />
        </div>
        {/* <button type="submit" className="save-button">
          Save Changes
        </button> */}
        <RippleButton type="submit" className="save-button">
          Save Changes
        </RippleButton>
      </form>
    </div>
  );
};

export default EditProfile;
