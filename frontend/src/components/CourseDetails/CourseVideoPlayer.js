import React from 'react';
import './CourseVideoPlayer.css';

const CourseVideoPlayer = ({ video }) => {
  return (
    <div className="video-player">
      {video ? (
        <>
          <h2>{video.title}</h2>
          <video controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <p>Select a video to play</p>
      )}
    </div>
  );
};

export default CourseVideoPlayer;
