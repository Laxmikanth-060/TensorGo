import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./CourseMaterials.module.css";

const CourseMaterials = ({ data, updateData,courseId }) => {
  const [modules, setModules] = useState(data);
  const fileInputRef = useRef(null);

  const handleModuleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedModules = [...modules];
    updatedModules[index][name] = value;
    setModules(updatedModules);
    updateData(updatedModules);
  };

  const handleVideoChange = (moduleIndex, videoIndex, event) => {
    const { name, value, files } = event.target;
    const updatedModules = [...modules];
    if (name === "videoFile") {
      updatedModules[moduleIndex].videosList[videoIndex][name] = files[0];
    } else {
      updatedModules[moduleIndex].videosList[videoIndex][name] = value;
    }
    setModules(updatedModules);
    updateData(updatedModules);
  };

  const toggleExpand = (moduleIndex, videoIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videosList[videoIndex].expanded = !updatedModules[moduleIndex].videosList[videoIndex].expanded;
    setModules(updatedModules);
    updateData(updatedModules);
  };

  const addModule = () => {
    setModules([
      ...modules,
      {
        moduleName: "",
        videosList: [
          {
            videoName: "",
            description: "",
            videoFile: null,
            expanded: true,
          },
        ],
      },
    ]);
  };

  const removeModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
    updateData(updatedModules);
  };

  const addVideo = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videosList.push({
      videoName: "",
      description: "",
      videoFile: null,
      expanded: true,
    });
    setModules(updatedModules);
    updateData(updatedModules);
  };

  const removeVideo = (moduleIndex, videoIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videosList.splice(videoIndex, 1);
    setModules(updatedModules);
    updateData(updatedModules);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to the backend or perform any required actions
    console.log(modules);
  };

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      formData.append("courseId", courseId);
      console.log(formData)

      //   for (let pair of formData.entries()) {
      //     console.log(pair[0] + ": " + pair[1].name);
      //   }

      try {
        const response = await fetch("http://localhost:1234/gDrive/upload", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        const data = await response.json();
        console.log("Uploaded files: ", data.files);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h5 className={styles.title}>Modules and Videos</h5>
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className={styles.moduleContainer}>
            <div className={styles.moduleHeader}>
              <div className={styles.field}>
                <label className={styles.label}>Module Name</label>
                <input
                  type="text"
                  name="moduleName"
                  value={module.moduleName}
                  onChange={(e) => handleModuleChange(moduleIndex, e)}
                  className={styles.input}
                  required
                />
              </div>
              <button type="button" onClick={() => removeModule(moduleIndex)} className={styles.removeButton}>
                Remove
              </button>
            </div>
            {module.videosList.map((video, videoIndex) => (
              <div key={videoIndex} className={styles.videoContainer}>
                <div className={styles.videoHeader}>
                  <div className={styles.videoNameInput}>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        name="videoName"
                        value={video.videoName}
                        onChange={(e) => handleVideoChange(moduleIndex, videoIndex, e)}
                        className={styles.input}
                        placeholder=""
                        required
                      />
                      <label className={styles.floatingLabel}>Video Name</label>
                    </div>
                  </div>
                  <div className={styles.videoActions}>
                    <FontAwesomeIcon
                      icon={video.expanded ? faChevronUp : faChevronDown}
                      onClick={() => toggleExpand(moduleIndex, videoIndex)}
                      className={styles.expandIcon}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => removeVideo(moduleIndex, videoIndex)}
                      className={styles.removeIcon}
                    />
                  </div>
                </div>
                {video.expanded && (
                  <div className={styles.videoDetails}>
                    <div className={styles.videoField}>
                      <div className={styles.inputGroup}>
                        <textarea
                          name="description"
                          value={video.description}
                          onChange={(e) => handleVideoChange(moduleIndex, videoIndex, e)}
                          className={styles.textarea}
                          placeholder=""
                          required
                        />
                        <label className={styles.floatingLabel}>Description</label>
                      </div>
                    </div>
                    <div className={styles.videoField}>
                      <label className={styles.label}>Video File</label>
                      <input
                        type="file"
                        multiple ref={fileInputRef}
                        name="videoFile"
                        onChange={(e) => handleVideoChange(moduleIndex, videoIndex, e)}
                        className={styles.fileInput}
                        required
                      />
                      <button 
                        type="button" 
                        className={styles.uploadButton} 
                        onClick={() => document.getElementsByName(`videoFile`)[0].click()}
                      >
                        Upload Video
                      </button>
                      <button 
                        type="button" 
                        className={styles.uploadButton} 
                        onClick={handleFileUpload}
                      >
                        Submit Video
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addVideo(moduleIndex)}
              className={styles.addVideoButton}
            >
              Add Video
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addModule}
          className={styles.addModuleButton}
        >
          Add Module
        </button>
      </form>
      <div className={styles.previewContainer}>
        <h5 className={styles.title}>Course Structure</h5>
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className={styles.previewModule}>
            <strong>{moduleIndex + 1}. {module.moduleName}</strong>
            {module.videosList.map((video, videoIndex) => (
              <div key={videoIndex} className={styles.previewVideo}>
                {moduleIndex + 1}.{videoIndex + 1} {video.videoName}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseMaterials;
