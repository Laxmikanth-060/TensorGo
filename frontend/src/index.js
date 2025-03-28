import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCourseMain from "./components/CreateCourse/CreateCourseMain.js";
import Courses from "./components/Courses/Courses.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";
import { UserProvider } from "./context/UserContext.js";
import Profile from "./components/Profile/Profile.js";
import EditProfile from "./components/Profile/EditProfile.js";
import EnrollCourse from "./components/EnrollCourse/EnrollCourse.js";
import {
  ProtectedRoute,
  SuperAdminRoute,
} from "./protectedRoutes/protectedRoutes.js";
import NotAuthorized from "./components/shared/NotAuthorized.js";
import NotFound from "./components/shared/NotFound.js";

import AddPlan from "./components/Courses/Addplan.js"

import EmailVerify from "./components/EmailVerify/EmailVerify.js";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/add-new-course",
        element: (
          <SuperAdminRoute>
            <CreateCourseMain />
          </SuperAdminRoute>
        ),
      },
      
      {
        path: "/enroll/:planId",
        element: (
          <ProtectedRoute>
            <EnrollCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/not-authorized",
        element: <NotAuthorized />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path:"/add-plan",
        element:<AddPlan/>
      }
    ],
  },
  {
    path: "/api/auth/users/:id/verify/:token",
    element: <EmailVerify />,
  },
  {
    path: "/api/auth/users/:id/verify/:token",
    element: <EmailVerify />,
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
