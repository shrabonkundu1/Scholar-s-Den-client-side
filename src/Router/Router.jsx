import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home";
import AllSession from "../Pages/AllSession/AllSession";
import Dashboard from "../Pages/Dashboard/Dashboard";

  export const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayouts></MainLayouts>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/allStudySection",
            element: <AllSession></AllSession>
        },
      ]
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>
    }
  ]);