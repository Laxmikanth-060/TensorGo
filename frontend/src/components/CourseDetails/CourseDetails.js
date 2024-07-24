import React, { useState } from 'react';
import CourseSidebar from './CourseSidebar';
import CourseVideoPlayer from './CourseVideoPlayer';
import "./CourseDetails.css";

const CourseDetails = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="course-details">
      <CourseSidebar onVideoSelect={handleVideoSelect} />
      <CourseVideoPlayer video={selectedVideo} />
    </div>
  );
};

export default CourseDetails;
