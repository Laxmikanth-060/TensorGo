import React, { useState } from "react";
import styles from "./CourseMaterials.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const CourseMaterials = () => {
  const [modules, setModules] = useState([
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

  const handleModuleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedModules = [...modules];
    updatedModules[index][name] = value;
    setModules(updatedModules);
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
  };

  const toggleExpand = (moduleIndex, videoIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videosList[videoIndex].expanded = !updatedModules[moduleIndex].videosList[videoIndex].expanded;
    setModules(updatedModules);
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
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
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
  };

  const removeVideo = (moduleIndex, videoIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videosList = updatedModules[moduleIndex].videosList.filter(
      (_, i) => i !== videoIndex
    );
    setModules(updatedModules);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to the backend or perform any required actions
    console.log(modules);
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
                Remove Module
              </button>
            </div>
            {module.videosList.map((video, videoIndex) => (
              <div key={videoIndex} className={styles.videoContainer}>
                <div className={styles.videoHeader}>
                  <div className={styles.videoNameInput}>
                    <input
                      type="text"
                      name="videoName"
                      value={video.videoName}
                      onChange={(e) => handleVideoChange(moduleIndex, videoIndex, e)}
                      placeholder="Video Name"
                      className={styles.input}
                      required
                    />
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
                      <label className={styles.label}>Description</label>
                      <textarea
                        name="description"
                        value={video.description}
                        onChange={(e) => handleVideoChange(moduleIndex, videoIndex, e)}
                        className={styles.textarea}
                        required
                      />
                    </div>
                    <div className={styles.videoField}>
                      <label className={styles.label}>Video File</label>
                      <input
                        type="file"
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
