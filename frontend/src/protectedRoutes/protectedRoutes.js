import React, { useContext, useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import Loader from "../components/shared/Loader.js";
// import axios from "axios";
import getRegisteredCourseByUserId from "../utils/getRegisteredCoursesByUserId.js";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

const SuperAdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.isSuperAdmin === false) {
    return <Navigate to="/not-authorized" />;
  }
  return children;
};

const CourseAuthProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const { courseId } = useParams();
  const [isRegistered, setIsRegistered] = useState(null);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      if (user) {
        try {
          const courses = await getRegisteredCourseByUserId(user._id);
          const isUserRegistered = courses.some(
            (course) => String(course._id) === String(courseId)
          );
          setIsRegistered(isUserRegistered);
        } catch (error) {
          console.error("Error fetching registered courses:", error);
          setIsRegistered(false); 
        }
      }
    };
    if (user) {
      fetchRegisteredCourses();
    }
  }, [user, courseId]);

  if (loading || isRegistered === null) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isRegistered) {
    return <Navigate to={`/course/${courseId}/overview`} replace />;
  }

  return children;
};





export { ProtectedRoute, SuperAdminRoute, CourseAuthProtectedRoute };
