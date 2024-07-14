import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import styles from "./CourseInformation.module.css";

const CourseInformation = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    description: "",
    coverImage: null,
  });

  const [imageLink, setImageLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "8781a1d6743760303a07331a4de14957");

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      setImageLink(response.data.data.url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData((prevData) => ({
      ...prevData,
      coverImage: file,
    }));
    uploadImage(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  useEffect(() => {
    if (imageLink) {
      console.log("Image uploaded: ", imageLink);
      // You can perform additional actions with the image link here
    }
  }, [imageLink]);

  return (
    <div className={styles.formContainer}>
      <h5>Course Information</h5>
      <div className={styles.formDiv}>
        <div className={styles.formDivLeft}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.dropdowns}>
            <div className={`${styles.formGroup} ${styles.dropdown}`}>
              <label htmlFor="category" className={styles.label}>Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.inputField}
                required
              >
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.dropdown}`}>
              <label htmlFor="level" className={styles.label}>Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={styles.inputField}
                required
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.inputField}
              maxLength={30}
              rows={5}
              required
            />
          </div>
        </div>
        <div className={styles.formDivRight}>
          <div className={styles.formGroup}>
            <label htmlFor="coverImage" className={styles.label}>Cover Image</label>
            {imageLink ? (
              <img
                src={imageLink}
                alt="preview"
                className={styles.previewImage}
              />
            ) : (
              <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop to upload, or click to select files</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
