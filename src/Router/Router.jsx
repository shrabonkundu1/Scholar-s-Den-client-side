import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home";
import AllSession from "../Pages/AllSession/AllSession";
import Login from "../Security/Login";
import Register from "../Security/Register";
import SessionDetails from "../Pages/SessionDetails/SessionDetails";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layouts/Dashboard";

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
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/studySessions/:id",
            element: <PrivateRoutes><SessionDetails></SessionDetails></PrivateRoutes>
        },
      ]
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        // Only Admin routes:
        {
          path: "/adminHome",
          
        }
      ]
    }
  ]);