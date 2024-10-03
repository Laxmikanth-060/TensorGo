import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './CourseDetails.css';
import { FaPlayCircle, FaCheckCircle, FaCircle } from 'react-icons/fa'; 
import { Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getCourseById from '../../utils/getCourseById';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { getUserProgress, markVideoAsCompleted } from '../../utils/getAndUpdateCourseProgress';

const CourseDetails = () => {
  const { courseId } = useParams(); 
  const { user } = useContext(UserContext);
  const userId = user?._id;
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('Introduction');
  const [currentVideoDescription,setCurrentVideoDescription] = useState('');
  const [activeKey, setActiveKey] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [videoId,setVideoId] = useState('');
  

  useEffect(() => {
  
    const fetchCourseData = async () => {
      const courseData = await getCourseById(courseId);
      if (courseData) {
        setCourseData(courseData);
        setModules(courseData.modules);
        //console.log(courseData)
        if (courseData?.modules?.length > 0 && courseData?.modules[0]?.videosList?.length > 0) {
          setCurrentVideo(courseData.modules[0].videosList[0].videoUrl);
          setCurrentVideoTitle(courseData.modules[0].videosList[0].videoName);
          setCurrentVideoDescription(courseData.modules[0].videosList[0].description);
          setVideoId(courseData.modules[0].videosList[0]._id);
        }
      }
    };

    const fetchProgress = async () => {
      const userProgress = await getUserProgress(userId, courseId);
      setProgress(userProgress?.completedVideos.map(video => video.videoId) || []);
    };
    fetchProgress();

    fetchCourseData();
  }, [courseId,userId]);

  

  const handleAccordionClick = (index) => {
    setActiveKey(activeKey === index ? null : index);
  };

  const handleVideoClick = (videoUrl, videoName,description,videoId) => {
    setCurrentVideo(videoUrl);
    setCurrentVideoTitle(videoName);
    setCurrentVideoDescription(description);
    setVideoId(videoId);
  };


  const handleVideoComplete = async () => {
    await markVideoAsCompleted(userId, courseId, videoId);
     //console.log(updatedProgress)
    // setProgress(updatedProgress?.completedVideos?.map(video => video.videoId));
    setProgress(prevProgress => {
      if (!prevProgress.includes(videoId)) {
        return [...prevProgress, videoId];
      }
      return prevProgress;
    });
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
                  
                  <li key={idx} onClick={() => handleVideoClick(item.videoUrl, item.videoName,item.description,item._id)}>
                    {progress?.includes(item._id) ? (
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
          <h1 className='text-heading'>{currentVideoTitle}</h1>
          <ReactPlayer
            url={`http://localhost:1234/gDrive/file/${currentVideo}`}
            controls
            onEnded={handleVideoComplete}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          />
          {progress?.includes(videoId) ? 
            (
              <button className="mark-complete-btn">
                Completed
              </button>
            ) : 
            (<button onClick={markAsComplete} className="mark-complete-btn">
              Mark as Complete
            </button>)
          }
         </div>
        <div className='video-description-container'>
          <div>
            <h1 className='text-heading'>Description</h1>
            <p className='video-description'>{currentVideoDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
