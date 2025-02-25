import React, { useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import AOS from "aos";
import "aos/dist/aos.css";
const AdminHome = () => {
    const {user} = useAuth();
    useEffect(() => {
      AOS.init({
        duration: 1500, 
        easing: "ease-out-quart", 
        // easing: "ease-in-out"
      });
    }, []);
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-center" data-aos="zoom-in">
      <h2 className="text-2xl font-bold font-Cinzel mb-4">Admin Dashboard</h2>
      <img src={user?.photoURL} alt="User" className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300" />
      <p className="text-lg font-semibold mt-2">{user?.displayName}</p>
      <p className="text-gray-500">{user?.email}</p>
      <p className="text-blue-600 font-medium">Role: Admin</p>
      <button onClick={() => setEditing(true)} className="mt-4 btn btn-primary">Update Profile</button>
    </div>
    );
};

export default AdminHome;