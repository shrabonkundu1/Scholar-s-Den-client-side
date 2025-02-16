import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { MdBookmarkAdd, MdGroupAdd, MdLocalLibrary } from "react-icons/md";
import { IoBookOutline, IoLogoStencil } from "react-icons/io5";
import { CgLogIn } from "react-icons/cg";
import { SiSecurityscorecard } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
import Swal from "sweetalert2";
import logo from '../../public/favIcon.jpeg'

const Navbar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    useEffect(() => {
      setActiveLink(location.pathname);
    }, [location.pathname]);
  
    // const handleLogout = () => {
    //   logOutUser()
    //     .then(() => {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Logged out successfully!",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     })
    //     .catch((error) => {
    //       toast.error("Logout failed. Please try again.", {
    //         position: "top-center",
    //       });
    //     });
    // };
  
    const getLinkStyle = (path) => {
      const isActive = activeLink === path;
      return `relative px-4 py-2 text-sm font-bold transition-colors flex items-center gap-2 duration-200 
        ${isActive ? "text-[#02c39a]" : "text-gray-700 hover:text-[#02c39a]"} 
        before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
        before:bg-[#02c39a] before:transform before:scale-x-0 before:transition-transform 
        before:duration-300 hover:before:scale-x-100 ${
          isActive ? "before:scale-x-100" : ""
        }`;
    };
  
    const links = (
      <ul className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5">
        <li>
          <Link
            to="/"
            className={getLinkStyle("/")}
            onClick={() => setActiveLink("/")}
          >
            <FaHome size={19} /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/allStudySection"
            className={getLinkStyle("/allStudySection")}
            onClick={() => setActiveLink("/allStudySection")}
          >
            <IoBookOutline size={19} />
            Study Session
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={getLinkStyle("/dashboard")}
            onClick={() => setActiveLink("/dashboard")}
          >
            <IoBookOutline size={19} />
            Dashboard
          </Link>
        </li>

        <div className="flex items-center md:space-x-4 md:hidden">
          {/* {user ? ( */}
            <div className="flex items-center gap-3 space-x-2">
              {/* <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              /> */}
              <button
                className="text-sm text-[#02c39a] font-bold flex items-center gap-1"
              >
                <TbLogout2 size={19} />
                Logout
              </button>
            </div>
          {/* ) : ( */}
            {/* <div className=" ">
              <Link to="/login" className={getLinkStyle("/login")}>
                <CgLogIn size={19} /> Login
              </Link>
              <Link to="/signUp" className={getLinkStyle("/signUp")}>
                <SiSecurityscorecard size={19} /> Sign Up
              </Link>
            </div>
          )} */}
        </div>
      </ul>
    );
  
    return (
      <nav className="bg-gradient-to-r from-[#f0fafc] to-white">
        <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-[#0077b6]">
                <p className="font-semibold flex items-center gap-2">
                    <img className="w-12 h-12 " src={logo} alt="" />
                  <span className="bg-gradient-to-r from-[#023e8a] via-[#0fa3b1] to-[#00bbf9] bg-clip-text text-transparent font-bold text-3xl font-Cinzel ">
                    Scholar's <span className="">Den</span>
                  </span>
                </p>
              </Link>
            </div>
  
            {/* Navigation Links */}
            <div className="hidden md:flex">{links}</div>
  
            {/* User Actions */}
            <div className="md:flex hidden items-center space-x-4">
              {/* {user ? ( */}
                <div className="flex items-center gap-3 space-x-2">
                  {/* <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  /> */}
                  <button
                    // onClick={handleLogout}
                    className="text-sm text-[#2ec4b6] font-bold flex items-center gap-1 border hover:text-white border-[#2ec4b6] p-3 rounded-md hover:bg-gradient-to-r hover:from-[#2ec4b6] hover:to-[#6feccb]"
                  >
                    <TbLogout2 size={19} />
                    Logout
                  </button>
                </div>
              {/* ) : ( */}
                {/* <div className="flex items-center space-x-4">
                  <Link to="/login" className={getLinkStyle("/login")}>
                    <CgLogIn size={19} /> Login
                  </Link>
                  <Link to="/signUp" className={getLinkStyle("/signUp")}>
                    <SiSecurityscorecard size={19} /> Sign Up
                  </Link>
                </div>
              )} */}
            </div>
  
            {/* Mobile Menu Toggle */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-sm text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#2ec4b6] hover:to-[#6feccb]"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">{links}</div>
          </div>
        )}
      </nav>
    );
  };

export default Navbar;