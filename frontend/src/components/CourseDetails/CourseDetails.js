import React, { useState } from 'react';
import './CourseDetails.css';
import Accordion from 'react-bootstrap/Accordion';
import { FaPlayCircle } from 'react-icons/fa'; 

const CourseDetails = () => {
  const [currentVideo, setCurrentVideo] = useState('intro.mp4');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('Introduction');
  const [activeKey, setActiveKey] = useState(null);

  const modules = [
    {
      title: 'Module 1',
      content: [
        { title: 'Introduction', video: 'intro.mp4' },
        { title: 'Lesson 1', video: 'video1.mp4' },
        { title: 'Lesson 2', video: 'video2.mp4' }
      ]
    },
    {
      title: 'Module 2',
      content: [
        { title: 'Lesson 1', video: 'video3.mp4' },
        { title: 'Lesson 2', video: 'video4.mp4' }
      ]
    },
    // Add more modules as needed
  ];

  const handleAccordionClick = (index) => {
    setActiveKey(activeKey === index ? null : index);
  };

  return (
    <div className="course-home">
      <div className="module-list">
        <Accordion activeKey={activeKey}>
          {modules.map((module, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header onClick={() => handleAccordionClick(index)}>
                {module.title}
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  {module.content.map((item, idx) => (
                    <li key={idx} onClick={() => {
                      setCurrentVideo(item.video);
                      setCurrentVideoTitle(item.title);
                    }}>
                      <FaPlayCircle className="icon" /> {item.title}
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
        <video id="course-video" controls>
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default CourseDetails;
