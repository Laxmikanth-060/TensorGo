// services/progressService.js
import axios from 'axios';

// Function to mark a video as completed
export const markVideoAsCompleted = async (userId, courseId, videoId) => {
  
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/courses/complete-video`, {
      userId,
      courseId,
      videoId,
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error marking video as completed', error);
  }
};

// Function to get user's progress
export const getUserProgress = async (userId, courseId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/courses/progress/${courseId}/${userId}`);
    return response.data.progress;
  } catch (error) {
    console.error('Error fetching progress', error);
  }
};
