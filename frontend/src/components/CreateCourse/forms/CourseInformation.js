import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import styles from "./CourseInformation.module.css";

const CourseInformation = ({ data, updateData }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImage = async (file, imageType) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "8781a1d6743760303a07331a4de14957");

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      const imageUrl = response.data.data.url;
      setFormData((prevData) => ({
        ...prevData,
        [imageType]: imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const onDrop = (acceptedFiles, imageType) => {
    const file = acceptedFiles[0];
    setFormData((prevData) => ({
      ...prevData,
      [imageType]: file,
    }));
    uploadImage(file, imageType);
  };

  const { getRootProps: getCoverImageRootProps, getInputProps: getCoverImageInputProps, isDragActive: isCoverImageDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'coverImage'),
    accept: "image/*",
  });

  const { getRootProps: getThumbnailImageRootProps, getInputProps: getThumbnailImageInputProps, isDragActive: isThumbnailImageDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'thumbnailImage'),
    accept: "image/*",
  });

  useEffect(() => {
    updateData(formData);
  }, [formData]);

  return (
    <div className={styles.formContainer}>
      <h5><strong>Course Information</strong></h5>
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
                <option value="Technology">Technology</option>
                <option value="Personality Development">Personality Development</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.dropdown}`}>
              <label htmlFor="level" className={styles.label}>Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={`${styles.inputField}` }
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
              maxLength={300}
              rows={5}
              required
            />
          </div>
        </div>
        <div className={styles.formDivRight}>
          <div className={styles.formGroup}>
            <label htmlFor="coverImage" className={styles.label}>Cover Image</label>
            {formData.coverImage ? (
              <img
                src={formData.coverImage}
                alt="Cover Img"
                className={styles.previewImage}
              />
            ) : (
              <div {...getCoverImageRootProps({ className: styles.dropzone })}>
                <input {...getCoverImageInputProps()} />
                {isCoverImageDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop to upload, or click to select files</p>
                )}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="thumbnailImage" className={styles.label}>Thumbnail Image</label>
            {formData.thumbnailImage ? (
              <img
                src={formData.thumbnailImage}
                alt="Thumb Nail"
                className={styles.previewImage}
              />
            ) : (
              <div {...getThumbnailImageRootProps({ className: styles.dropzone })}>
                <input {...getThumbnailImageInputProps()} />
                {isThumbnailImageDragActive ? (
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
