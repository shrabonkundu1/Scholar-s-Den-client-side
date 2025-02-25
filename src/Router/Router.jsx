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
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import ManageMaterials from "../Pages/Dashboard/Admin/ManageMaterials";
import ManageSessions from "../Pages/Dashboard/Admin/ManageSessions";
import AddMaterials from "../Pages/Dashboard/Tutor/AddMaterials";
import TutorHome from "../Pages/Dashboard/Tutor/TutorHome";
import ViewMaterials from "../Pages/Dashboard/Tutor/ViewMaterials";
import CreateSessions from "../Pages/Dashboard/Tutor/CreateSessions";
import ViewSessions from "../Pages/Dashboard/Tutor/ViewSessions";
import BookSession from "../Pages/Dashboard/User/BookSession";
import ManageNotes from "../Pages/Dashboard/User/ManageNotes";
import Notes from "../Pages/Dashboard/User/Notes";
import UserHome from "../Pages/Dashboard/User/UserHome";
import UpdateMaterial from "../Pages/Dashboard/Tutor/UpdateMaterial";
import BookedSessionDetails from "../Pages/Dashboard/User/BookedSessionDetails";
import ViewStudyMaterials from "../Pages/Dashboard/User/ViewStudyMaterials";
import ManageApprovedSessions from "../Pages/Dashboard/Admin/ManageApprovedSessions";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";

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
      path: "dashboard",
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children: [
        // Only Admin routes:
        {
          path: "adminHome",
          element: <AdminRoute> <AdminHome></AdminHome></AdminRoute>,
        },
        {
          path: "users",
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
        },
        {
          path: "manageMaterials",
          element: <AdminRoute><ManageMaterials></ManageMaterials></AdminRoute>,
        },
        {
          path: "manageSessions",
          element: <AdminRoute><ManageSessions></ManageSessions></AdminRoute>,
        },
        {
          path: "manageApprovedSessions",
          element: <AdminRoute><ManageApprovedSessions></ManageApprovedSessions></AdminRoute>,
        },

        // Tutor routes:
        {
          path: "addMaterials",
          element:<TutorRoute> <AddMaterials></AddMaterials></TutorRoute>
        },
        {
          path: "updateMaterial/:id",
          element: <TutorRoute><UpdateMaterial></UpdateMaterial></TutorRoute>
        },
        {
          path: "tutorHome",
          element: <TutorRoute><TutorHome></TutorHome></TutorRoute>
        },
        {
          path: "viewMaterials",
          element: <TutorRoute><ViewMaterials></ViewMaterials></TutorRoute>,
        },
        {
          path: "createSession",
          element: <TutorRoute><CreateSessions></CreateSessions></TutorRoute>
        },
        {
          path: "viewSessions",
          element: <TutorRoute><ViewSessions></ViewSessions></TutorRoute>
        },

        // users routes:
        {
          path: "userHome",
          element: <UserHome></UserHome>
        },
        {
          path: "createNote",
          element: <Notes></Notes>
        },
        {
          path: "manageNotes",
          element: <ManageNotes></ManageNotes>
        },
        {
          path: "bookedSessions/:email",
          element: <BookSession></BookSession>
        },
        {
          path: "bookStudySessions/:id",
          element: <BookedSessionDetails></BookedSessionDetails>
        },
        // {
        //   path: "studySessions/:id",
        //   element: <BookedSessionDetails></BookedSessionDetails>
        // },
        {
          path: "viewStudyMaterials/:id",
          element: <ViewStudyMaterials></ViewStudyMaterials>
        },
      ]
    }
  ]);