import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SessionDetails = () => {
  const { loading } = useAuth();
  const [user,setUser] = useState([]);
//   const [loading,setLoading] = useState(false)
  const [sessions, setSessions] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  useEffect(() => {
    axiosSecure.get(`/studySessions/${id}`).then((res) => {
      setSessions(res.data);
    });
  }, [id]);

  useEffect(() => {
    axiosPublic.get('/users')
    .then(res => {
        setUser(res.data)
    })
  },[])
  
  const {
      sessionTitle,
      tutorName,
      averageRating,
      sessionDescription,
      registrationStartDate,
      classEndDate,
      classStartTime,
      registrationEndDate,
      reviews,
      registrationFee,
      sessionDuration,
      status,
    } = sessions;
    
      const isRegistrationClosed = new Date() > new Date(registrationEndDate);
    
      const isDisabled =
        isRegistrationClosed || user?.role === "admin" || user?.role === "tutor";
  console.log(sessions);

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className="py-16">
      <h2 className="text-4xl py-16 font-semibold font-Cinzel text-center">
        {sessionTitle}
      </h2>
      <div className="w-3/4 mx-auto text-xl font-medium space-y-6">
        <h2>Title : {sessionTitle}</h2>
        <p>
          Description : <span className="font-light">{sessionDescription}</span>
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
          <p>
            Tutor : <span>{tutorName}</span>
          </p>
          <p>
            Session Duration :{" "}
            <span className="font-light">{sessionDuration}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
          <p>
            Registration Starts Date :{" "}
            <span className="font-light">{registrationStartDate}</span>
          </p>
          <p>
            Registration Ends Date :{" "}
            <span className="font-light">{registrationEndDate}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
          <p>
            Class Starts : <span className="font-light">{classStartTime}</span>
          </p>
          <p>
            Class Ends : <span className="font-light">{classEndDate}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
          <p>
            Average Rating : <span className="font-light">{averageRating}</span>
          </p>
          <p>
            Session Status : <span className="font-light">{status}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
          <p>
            Registation Fee :{" "}
            <span className="font-light">{registrationFee}</span>
          </p>
          <button
            className={`mt-4 px-4 py-2 rounded text-[16px] ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#2ec4b6] to-[#6feccb] text-black"
            }`}
            disabled={isDisabled}
          >
            {isRegistrationClosed ? "Registration Closed" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;

// https://meet.google.com/pyd-rzzm-mgy
