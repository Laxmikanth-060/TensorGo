import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './CourseDetails.css';
import Accordion from 'react-bootstrap/Accordion';
import { FaPlayCircle } from 'react-icons/fa'; 
import { useLocation } from 'react-router-dom';
import getCourseById from '../../utils/getCourseById';

const CourseDetails = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('Introduction');
  const [activeKey, setActiveKey] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await getCourseById(id);
      if (courseData) {
        setCourseData(courseData);
        setModules(courseData.modules);
        if (courseData.modules.length > 0 && courseData.modules[0].videosList.length > 0) {
          setCurrentVideo(courseData.modules[0].videosList[0].videoUrl);
          setCurrentVideoTitle(courseData.modules[0].videosList[0].videoName);
        }
      }
    };
    fetchCourseData();
  }, [id]);

  const handleAccordionClick = (index) => {
    setActiveKey(activeKey === index ? null : index);
  };

  const handleVideoClick = (videoUrl, videoName) => {
    setCurrentVideo(videoUrl);
    setCurrentVideoTitle(videoName);
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
                    <li key={idx} onClick={() => handleVideoClick(item.videoUrl, item.videoName)}>
                      <FaPlayCircle className="icon" /> {item.videoName}
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <div className="video-display">
        <h1>{currentVideoTitle}</h1>
        <ReactPlayer url={`http://localhost:1234/gDrive/file/${currentVideo}`} controls />
        {/* Try testing with a known YouTube URL */}
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' controls /> */}
      </div>
    </div>
  );
};

export default CourseDetails;
