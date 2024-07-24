import React, { useState } from 'react';
import './CourseSidebar.css';

const CourseSidebar = ({ onVideoSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const courses = [
    {
      title: 'Introduction & Overview',
      duration: '2 hours',
      modules: [
        {
          title: 'Introduction to AI-ML',
          duration: '1 hour, 45 mins',
          videos: [
            { title: 'Course Overview', duration: '10 mins', url: 'video1.mp4' },
            { title: 'Practice', duration: '20 mins', url: 'video2.mp4' }
          ]
        }
      ]
    },
    {
      title: 'Trends & Insights',
      duration: '1 hour, 40 mins',
      modules: []
    }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={handleToggle} className="toggle-button">
        {isOpen ? '<-' : '->'}
      </button>
      <div className="contents">
        {courses.map((course, index) => (
          <div key={index} className="course">
            <h3>{course.title} - {course.duration}</h3>
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="module">
                <h4>{module.title} - {module.duration}</h4>
                {module.videos.map((video, videoIndex) => (
                  <div
                    key={videoIndex}
                    className="video"
                    onClick={() => onVideoSelect(video)}
                  >
                    {video.title} - {video.duration}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
