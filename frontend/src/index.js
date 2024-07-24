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
import Razorpay from "./components/PaymentGateway/Razorpay";
import CourseOverview from "./components/CourseDetails/CourseOverview";
import CourseDetails from "./components/CourseDetails/CourseDetails"
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
        path: "/courses/:id",
        element: <CourseOverview />,
      },
      {
        path:"/add-new-course",
        element:<CreateCourseMain/>,
      },
      {
        path: "/payment",
        element: <Razorpay />,
      },
      {
        path:'/course-details',
        element:<CourseDetails/>
      }
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
