import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home/Home'
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import CourseDetails from "./components/CourseDetails/CourseDetails";
import Courses from "./components/Courses/Courses";
import Payment from "./components/PaymentGateway/Payment";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"/courses",
        element:<Courses/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:'/courses/:id',
        element:<CourseDetails/>
      },
      {
        path: "/payment",
        element: <Payment/>
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
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
);
