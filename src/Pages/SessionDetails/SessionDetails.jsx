// import React, { useEffect, useState } from "react";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { useParams } from "react-router-dom";
// import useAxiosSecure from "../../Hooks/UseAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";

// const SessionDetails = () => {
//   const { loading,user } = useAuth();
//   // const [user, setUser] = useState([]);

//   const [isBooked, setIsBooked] = useState(false);

//   //   const [loading,setLoading] = useState(false)
//   const [sessions, setSessions] = useState([]);
//   const axiosPublic = useAxiosPublic();
//   const axiosSecure = useAxiosSecure();
//   const { id } = useParams();
//   useEffect(() => {
//     axiosSecure.get(`/studySessions/${id}`).then((res) => {
//       setSessions(res.data);
//     });
//   }, [id]);

//   // useEffect(() => {
//   //   axiosPublic.get("/users").then((res) => {
//   //     setUser(res.data);
//   //   });
//   // }, []);

//   const {
//     sessionTitle,
//     tutorName,
//     averageRating,
//     sessionDescription,
//     registrationStartDate,
//     classEndDate,
//     classStartTime,
//     registrationEndDate,
//     reviews,
//     registrationFee,
//     sessionDuration,
//     status,
//   } = sessions;

//   const isRegistrationClosed = new Date() > new Date(registrationEndDate);

//   const isDisabled =
//     isRegistrationClosed || user?.role === "admin" || user?.role === "tutor";
//   console.log(sessions);

//   // cheak session already booked nake
//   const checkBookedSession = async () => {
//     if (!user) return;

//     try {
//       const { data } = await axiosSecure.get(
//         `/checkBookedSession?studentEmail=${user.email}&sessionId=${sessions._id}`
//       );
//       setIsBooked(data.isBooked);
//     } catch (error) {
//       console.error("Error checking booked session:", error);
//     }
//   };

//   const handleBookSession = async () => {
//     if (!user) {
//       return alert("Please log in first!");
//     }
// console.log(user)
//     const bookingData = {
//       studentEmail: user?.email,
//       sessionId: sessions._id,
//       sessionTitle: sessions.sessionTitle,
//       tutorName: tutorName,
//       sessionDuration: sessionDuration,
//     };

//     try {
//       const { data } = await axiosPublic.post("/bookSession", bookingData);

//       if (data.insertedId) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Session booked successfully!",
//           showConfirmButton: false,
//           timer: 1500
//         });
//         setIsBooked(true);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error booking session:", error);
//     }
//   };

//   useEffect(() => {
//     checkBookedSession();
//   }, [sessions._id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <div className="py-16">
//       <h2 className="text-4xl py-16 font-semibold font-Cinzel text-center">
//         {sessionTitle}
//       </h2>
//       <div className="w-3/4 mx-auto text-xl font-medium space-y-6">
//         <h2>Title : {sessionTitle}</h2>
//         <p>
//           Description : <span className="font-light">{sessionDescription}</span>
//         </p>
//         <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
//           <p>
//             Tutor : <span>{tutorName}</span>
//           </p>
//           <p>
//             Session Duration :{" "}
//             <span className="font-light">{sessionDuration}</span>
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
//           <p>
//             Registration Starts Date :{" "}
//             <span className="font-light">{registrationStartDate}</span>
//           </p>
//           <p>
//             Registration Ends Date :{" "}
//             <span className="font-light">{registrationEndDate}</span>
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
//           <p>
//             Class Starts : <span className="font-light">{classStartTime}</span>
//           </p>
//           <p>
//             Class Ends : <span className="font-light">{classEndDate}</span>
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
//           <p>
//             Average Rating : <span className="font-light">{averageRating}</span>
//           </p>
//           <p>
//             Session Status : <span className="font-light">{status}</span>
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
//           <p>
//             Registation Fee :{" "}
//             <span className="font-light">{registrationFee}</span>
//           </p>
//           <button
//             onClick={handleBookSession}
//             disabled={isDisabled || isBooked}
//             className={`mt-4 px-4 py-2 rounded text-[16px] ${
//               isDisabled || isBooked
//                 ? "bg-gray-400 cursor-not-allowed text-white"
//                 : "bg-gradient-to-r from-[#2ec4b6] to-[#6feccb] text-black"
//             }`}
//           >
//             {isRegistrationClosed
//               ? "Registration Closed"
//               : isBooked
//               ? "Session Booked"
//               : "Book Now"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SessionDetails;

// // https://meet.google.com/pyd-rzzm-mgy


import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const SessionDetails = () => {
  const { loading, user } = useAuth();
  const [isBooked, setIsBooked] = useState(false);
  const [sessions, setSessions] = useState(null); // Initial state null রাখা হলো
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  useEffect(() => {
    axiosSecure.get(`/studySessions/${id}`).then((res) => {
      setSessions(res.data);
    });
  }, [id, axiosSecure]);

  useEffect(() => {
    if (sessions?._id && user) {
      checkBookedSession();
    }
  }, [sessions, user]);

  const checkBookedSession = async () => {
    try {
      const { data } = await axiosSecure.get(
        `/checkBookedSession?studentEmail=${user.email}&sessionId=${sessions._id}`
      );
      setIsBooked(data.isBooked);
    } catch (error) {
      console.error("Error checking booked session:", error);
    }
  };

  const handleBookSession = async () => {
    if (!user) {
      return alert("Please log in first!");
    }

    const bookingData = {
      studentEmail: user.email,
      sessionId: sessions._id,
      sessionTitle: sessions.sessionTitle,
      tutorName: sessions.tutorName,
      sessionDuration: sessions.sessionDuration,
    };

    try {
      const { data } = await axiosPublic.post("/bookSession", bookingData);

      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Session booked successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsBooked(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error booking session:", error);
    }
  };

  if (loading || !sessions) {
    return <p>Loading...</p>;
  }

  const {
    sessionTitle,
    tutorName,
    averageRating,
    sessionDescription,
    registrationStartDate,
    classEndDate,
    classStartTime,
    registrationEndDate,
    registrationFee,
    sessionDuration,
    status,
  } = sessions;
  const currentUser = users.find(u => u.email === user?.email);
  const isRegistrationClosed = new Date() > new Date(registrationEndDate);
  const isDisabled =
     isRegistrationClosed || currentUser.role === "admin" || currentUser.role === "tutor";
console.log(currentUser)
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
            Session Duration : <span className="font-light">{sessionDuration}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-4/5">
          <p>
            Registration Starts Date : <span className="font-light">{registrationStartDate}</span>
          </p>
          <p>
            Registration Ends Date : <span className="font-light">{registrationEndDate}</span>
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
            Registration Fee : <span className="font-light">{registrationFee}</span>
          </p>
          <button
            onClick={handleBookSession}
            disabled={isDisabled || isBooked}
            className={`mt-4 px-4 py-2 rounded text-[16px] ${
              isDisabled || isBooked
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-[#2ec4b6] to-[#6feccb] text-black"
            }`}
          >
            {isRegistrationClosed
              ? "Registration Closed"
              : isBooked
              ? "Session Booked"
              : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
