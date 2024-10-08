import axios from "axios";

const getAllCourses = async () => {
    try {
      // console.log(process.env.REACT_APP_BACKEND_URL) 
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/courses`);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses", error);
      return [];
    }
  };

  export default getAllCourses