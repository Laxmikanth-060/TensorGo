import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './CourseDetails.css';
import { FaPlayCircle, FaCheckCircle, FaRegCircle, FaCircle } from 'react-icons/fa'; 
import { Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getCourseById from '../../utils/getCourseById';

const CourseDetails = () => {
  const { courseId } = useParams(); 
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('Introduction');
  const [currentVideoDescription,setCurrentVideoDescription] = useState('');
  const [activeKey, setActiveKey] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [modules, setModules] = useState([]);
  const [videoProgress, setVideoProgress] = useState({});
  const [videoCompleted, setVideoCompleted] = useState({});

  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await getCourseById(courseId);
      if (courseData) {
        setCourseData(courseData);
        setModules(courseData.modules);
        if (courseData.modules.length > 0 && courseData.modules[0].videosList.length > 0) {
          setCurrentVideo(courseData.modules[0].videosList[0].videoUrl);
          setCurrentVideoTitle(courseData.modules[0].videosList[0].videoName);
          setCurrentVideoDescription(courseData.modules[0].videosList[0].description);
        }
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleAccordionClick = (index) => {
    setActiveKey(activeKey === index ? null : index);
  };

  const handleVideoClick = (videoUrl, videoName,description) => {
    setCurrentVideo(videoUrl);
    setCurrentVideoTitle(videoName);
    setCurrentVideoDescription(description);
  };

  const handleProgress = (state) => {
    setVideoProgress(prev => ({
      ...prev,
      [currentVideoTitle]: state.playedSeconds
    }));
  };

  const handleVideoComplete = () => {
    setVideoCompleted(prev => ({
      ...prev,
      [currentVideoTitle]: true
    }));
  };

  const markAsComplete = () => {
    handleVideoComplete();
  };

  if (courseData.length === 0) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="course-home">
      <div className="module-list">
        <Accordion activeKey={activeKey}>
          {modules.map((module, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header onClick={() => handleAccordionClick(index)}>
                {module.moduleName}
              </Accordion.Header>
              <Accordion.Body>
              <ul>
                {module.videosList.map((item, idx) => (
                  <li key={idx} onClick={() => handleVideoClick(item.videoUrl, item.videoName,item.description)}>
                    {videoCompleted[item.videoName] ? (
                      <div><FaCheckCircle className="status-icon completed" /></div>
                    ) : (
                      <div><FaCircle className="status-icon incomplete" /></div>
                    )}
                    <div className='video-name-container'>
                      <div><FaPlayCircle className="icon" /></div>
                      <p className='video-name'>{item.videoName}</p>
                    </div>
                  </li>
                ))}
              </ul>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <div className="video-display">
         <div className='video-container'>
          <h1>{currentVideoTitle}</h1>
          <ReactPlayer
            url={`http://localhost:1234/gDrive/file/${currentVideo}`}
            controls
            onProgress={handleProgress}
            onEnded={handleVideoComplete}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          />
          <button onClick={markAsComplete} className="mark-complete-btn">
            Mark as Complete
          </button>
         </div>
        <div className='video-description-container'>
          <div>
            <h1>Description</h1>
            <p className='video-description'>{currentVideoDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
