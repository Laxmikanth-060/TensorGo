import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCourseMain from './components/CreateCourse/CreateCourseMain';
import Courses from "./components/Courses/Courses";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import GoogleDrive from "./components/GoogleDrive/GoogleDrive";
import { UserProvider } from "./context/UserContext";
import CourseDetails from "./components/CourseDetails/CourseDetails"
import Profile from "./components/Profile/Profile"
import EditProfile from "./components/Profile/EditProfile";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/driveUpload",
        element: <GoogleDrive />,
      },
      {
        path:"/add-new-course",
        element:<CreateCourseMain/>,
      },
      {
        path:'/p/courses/:courseId',
        element:<CourseDetails/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'/edit-profile',
        element:<EditProfile/>
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </UserProvider>

);
