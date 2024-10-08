import axios from "axios";

const getRegisteredCourseByUserId = async (userId) => {
  try {
    const registeredCourses = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses/${userId}/courses`
    );
    return registeredCourses.data;
  } catch (error) {
    console.error("Error fetching courses", error);
    return [];
  }
};

export default getRegisteredCourseByUserId;
