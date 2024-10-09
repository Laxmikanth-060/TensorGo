import axios from "axios";
export const getAverageRating = async (courseId) => {
  try {
    const url = "http://localhost:1234";
    const response = await axios.get(`${url}/courses/${courseId}/getreviews`, {
      withCredentials: true,
    });
    // console.log(response);
    if (response.data.length > 0) {
      const total = response.data.length;
      const avgRating =
        response.data.reduce((acc, review) => acc + review.rating, 0) / total;
      if (avgRating == undefined) return 0;
      return avgRating;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return 0;
  }
};
