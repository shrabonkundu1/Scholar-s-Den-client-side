import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaList,
  FaBook,
  FaNotesMedical,
  FaStreetView,
} from "react-icons/fa";
import { IoCloseSharp, IoCreateSharp } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { TbUpload } from "react-icons/tb";
import { RiSearchEyeLine } from "react-icons/ri";
import UseAdmin from "../Hooks/UseAdmin";
import useTutor from "../Hooks/useTutor";
import { GiHamburgerMenu } from "react-icons/gi";
import DashboardRedirect from "../Pages/Dashboard/DashboardRedirect/DashboardRedirect";

const Dashboard = () => {
  //   const [isAdmin] = UseAdmin();
  const isAdmin = true;
  // const isAdmin = false;
  // const isTutor = true;
  const isTutor = false;
  //   const [isTutor] = useTutor();

  const commonLinks = [{ to: "/", label: "Home", icon: <FaHome /> }];

  // Links for Admin
  const adminLinks = [
    { to: "/dashboard/adminHome", label: "Admin Home", icon: <FaHome /> },
    {
      to: "/dashboard/manageSessions",
      label: "Manage Sessions",
      icon: <FaList />,
    },
    {
      to: "/dashboard/manageMaterials",
      label: "Manage Materials",
      icon: <FaList />,
    },
    { to: "/dashboard/users", label: "Manage Users", icon: <FaUsers /> },
  ];

  // Links for Tutor
  const tutorLinks = [
    { to: "/dashboard/tutorHome", label: "Tutor Home", icon: <FaHome /> },
    {
      to: "/dashboard/createSession",
      label: "Create Session",
      icon: <IoCreateSharp />,
    },
    {
      to: "/dashboard/viewSessions",
      label: "View Sessions",
      icon: <RiSearchEyeLine />,
    },
    {
      to: "/dashboard/addMaterials",
      label: "Add Materials",
      icon: <TbUpload />,
    },
    {
      to: "/dashboard/viewMaterials",
      label: "View Materials",
      icon: <RiSearchEyeLine />,
    },
  ];

  // Links for User
  const userLinks = [
    { to: "/dashboard/userHome", label: "User Home", icon: <FaHome /> },
    {
      to: "/dashboard/bookedSessions",
      label: "Booked Sessions",
      icon: <FaBook />,
    },
    {
      to: "/dashboard/createNote",
      label: "Create Note",
      icon: <FaNotesMedical />,
    },
    { to: "/dashboard/manageNotes", label: "Manage Notes", icon: <FaList /> },
    {
      to: "/dashboard/viewMaterials",
      label: "View Study Materials",
      icon: <FaStreetView />,
    },
  ];

  //   mobile view
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <DashboardRedirect></DashboardRedirect>
      <div className="flex">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="md:hidden p-4 text-white bg-green-500 rounded-full absolute top-2 left-4 z-50"
          onClick={handleSidebarToggle}
        >
          {isSidebarOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>

        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-64 bg-green-100 min-h-screen fixed md:relative z-40 transition-all duration-300 ease-in-out`}
        >
          <div className="py-10">
            <p className="pl-5 text-2xl mt-10 font-Cinzel font-bold">
              Scholar's Den
            </p>
          </div>
          <ul className="menu space-y-4">
            {isAdmin
              ? adminLinks.map((link, index) => (
                  <li className="text-[16px]" key={index}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.icon} {link.label}
                    </NavLink>
                  </li>
                ))
              : isTutor
              ? tutorLinks.map((link, index) => (
                  <li className="text-[18px] font-medium" key={index}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.icon} {link.label}
                    </NavLink>
                  </li>
                ))
              : userLinks.map((link, index) => (
                  <li className="text-[18px] font-medium" key={index}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.icon} {link.label}
                    </NavLink>
                  </li>
                ))}

            {/* Common Links */}
            <div className="border w-11/12"></div>
            {commonLinks.map((link, index) => (
              <li className="text-[18px] font-medium" key={index}>
                <NavLink to={link.to} onClick={() => setIsSidebarOpen(false)}>
                  {link.icon} {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-slate-100  mt-20  md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
