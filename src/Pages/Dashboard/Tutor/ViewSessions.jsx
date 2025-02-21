// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
// import useAuth from '../../../Hooks/useAuth';

// const ViewSessions = () => {
//     const [sessions, setSessions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const axiosSecure = useAxiosSecure();
//     const {user} = useAuth();
//     console.log(user?.email)
//     console.log(sessions)
//     useEffect(() => {
//         const fetchSessions = () => {
//             setLoading(true);  

//             axiosSecure
//                 .get(`/studySessions/tutor/${user?.email}`)
//                 .then((response) => {
//                     setSessions(response.data); // Store sessions in state
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching sessions:", error);
//                 })
//                 .finally(() => {
//                     setLoading(false); 
//                 });
//         };

//         fetchSessions();
//     }, []);

//     if(loading){
//         return (
//             <div className="flex justify-center items-center mt-72">
//               <span className="loading loading-ring loading-xs"></span>
//               <span className="loading loading-ring loading-sm"></span>
//               <span className="loading loading-ring loading-md"></span>
//               <span className="loading loading-ring loading-lg"></span>
//             </div>
//           );
//     }
//     return (
//         <div>
//             <div>
//                 <h2 className='text-4xl md:text-5xl font-Cinzel font-semibold text-center my-16'>View Sessions</h2>
//             </div>
//             <div>
//             <h2>Total Sessions {sessions.length}</h2>
//             {sessions.length === 0 ? (
//                 <p>No sessions available.</p>
//             ) : (
//                 <ul>
//                     {sessions.map((session) => (
//                         <li key={session._id}>
//                             <h3>{session.topic}</h3>
//                             <p>Status: {session.status}</p>
//                             <p>Date: {session.date}</p>
//                             {/* You can add more session details as needed */}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//         </div>
//     );
// };

// export default ViewSessions;
// import React, { useEffect, useState } from "react";
// import axiosSecure from "../../../Hooks/UseAxiosSecure"; // Import your axiosSecure hook
// import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";

// const ViewSessions = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const axiosSecure = useAxiosSecure()
//   const {user} = useAuth()

//   useEffect(() => {
//     const fetchSessions = () => {
//       setLoading(true); 
//       axiosSecure
//       .get(`/studySessions/tutor/${user?.email}`)
//         .then((response) => {
//           setSessions(response.data); 
//         .catch((error) => {
//           console.error("Error fetching sessions:", error);
//         })
//         .finally(() => {
//           setLoading(false); 
//         });
//     };

//     fetchSessions();
//   }, []);
//   const handleResendRequest = (sessionId) => {
//     axiosSecure
//       .post(`/studySessions/resend/${sessionId}`) 
//       .then((response) => {
//         alert(response.data.message);
//         setSessions((prevSessions) =>
//           prevSessions.map((session) =>
//             session._id === sessionId ? { ...session, status: "pending" } : session
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Error resending request:", error);
//         alert("Failed to resend request.");
//       });
//   };

//   if (loading) {
//     return (
//                      <div className="flex justify-center items-center mt-72">
//                        <span className="loading loading-ring loading-xs"></span>
//                        <span className="loading loading-ring loading-sm"></span>
//                        <span className="loading loading-ring loading-md"></span>
//                        <span className="loading loading-ring loading-lg"></span>
//                      </div>
//                    );
//   }

//   return (
//     <div>
//       <h2 className="text-3xl font-semibold text-center my-5">View All Study Sessions</h2>
      
//       {sessions.length === 0 ? (
//         <p>No sessions available.</p>
//       ) : (
//         <div>
           
//         <div className="card bg-white  rounded-xs w-9/12 py-8 mx-auto">
//           <div className="flex justify-around items-center">
//             <h2 className="text-3xl font-semibold font-Cinzel">
//               Total Sessions : {sessions.length}
//             </h2>
//           </div>
  
//           <div className="overflow-x-auto my-8 mx-16">
//             <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
//               {/* head */}
//               <thead className="bg-[#fb923c] text-white text-left uppercase">
//                 <tr className="rounded-t-xl">
//                   <th className="px-6 py-4 rounded-tl-lg">#</th>
//                   <th className="px-6 py-4">Session Title</th>
//                   <th className="px-6 py-4">Tutor Email</th>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4 rounded-tr-lg">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                  {/* Approved Sessions */}
//               {sessions
//                 .filter((session) => session.status === "approved")
//                 .map((session) => (
//                   <tr key={session._id}>
//                     <td className="border px-4 py-2">{session.topic}</td>
//                     <td className="border px-4 py-2">{session.status}</td>
//                     <td className="border px-4 py-2">{session.date}</td>
//                     <td className="border px-4 py-2">View Details</td>
//                   </tr>
//                 ))}
//               {/* Pending Sessions */}
//               {sessions
//                 .filter((session) => session.status === "pending")
//                 .map((session) => (
//                   <tr key={session._id}>
//                     <td className="border px-4 py-2">{session.topic}</td>
//                     <td className="border px-4 py-2">{session.status}</td>
//                     <td className="border px-4 py-2">{session.date}</td>
//                     <td className="border px-4 py-2">View Details</td>
//                   </tr>
//                 ))}
//               {/* Rejected Sessions with Resend Request Button */}
//               {sessions
//                 .filter((session) => session.status === "rejected")
//                 .map((session) => (
//                   <tr key={session._id}>
//                     <td className="border px-4 py-2">{session.topic}</td>
//                     <td className="border px-4 py-2">{session.status}</td>
//                     <td className="border px-4 py-2">{session.date}</td>
//                     <td className="border px-4 py-2">
//                       <button
//                         onClick={() => handleResendRequest(session._id)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                       >
//                         Resend Request
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewSessions;

// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../../Hooks/UseAxiosSecure"; 
// import useAuth from "../../../Hooks/useAuth";

// const ViewSessions = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!user?.email) return; 

//     const fetchSessions = () => {
//       setLoading(true); 
//       axiosSecure
//         .get(`/studySessions/tutor/${user.email}`)
//         .then((response) => {
//           setSessions(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching sessions:", error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     };

//     fetchSessions();
//   }, [user?.email]); 
//   const handleResendRequest = (sessionId) => {
//     axiosSecure
//       .post(`/studySessions/resend/${sessionId}`)
//       .then((response) => {
//         alert(response.data.message);
//         setSessions((prevSessions) =>
//           prevSessions.map((session) =>
//             session._id === sessionId ? { ...session, status: "pending" } : session
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Error resending request:", error);
//         alert("Failed to resend request.");
//       });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center mt-72">
//         <span className="loading loading-ring loading-xs"></span>
//         <span className="loading loading-ring loading-sm"></span>
//         <span className="loading loading-ring loading-md"></span>
//         <span className="loading loading-ring loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-3xl font-semibold text-center my-5">View All Study Sessions</h2>

//       {sessions.length === 0 ? (
//         <p>No sessions available.</p>
//       ) : (
//         <div className="card bg-white rounded-xs w-9/12 py-8 mx-auto">
//           <div className="flex justify-around items-center">
//             <h2 className="text-3xl font-semibold font-Cinzel">
//               Total Sessions: {sessions.length}
//             </h2>
//           </div>

//           <div className="overflow-x-auto my-8 mx-16">
//             <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
//               <thead className="bg-[#fb923c] text-white text-left uppercase">
//                 <tr className="rounded-t-xl">
//                   <th className="px-6 py-4 rounded-tl-lg">#</th>
//                   <th className="px-6 py-4">Session Title</th>
//                   <th className="px-6 py-4">Tutor Email</th>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4 rounded-tr-lg">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {sessions.map((session, index) => (
//                   <tr key={session._id}>
//                     <td className="border px-4 py-2">{index + 1}</td>
//                     <td className="border px-4 py-2">{session.sessionTitle}</td>
//                     <td className="border px-4 py-2">{session.tutorEmail}</td>
//                     <td className="border px-4 py-2">{session.status}</td>
//                     <td className="border px-4 py-2">
//                       {session.status === "rejected" && (
//                         <button
//                           onClick={() => handleResendRequest(session._id)}
//                           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                         >
//                           Resend Request
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewSessions;
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure"; 
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const ViewSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return; 

    const fetchSessions = () => {
      setLoading(true);
      axiosSecure
        .get(`/studySessions/tutor/${user.email}`)
        .then((response) => {
          setSessions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchSessions();
  }, [user?.email]);

  // Resend approval request for rejected sessions
  // const handleResendRequest = (sessionId) => {
  //   axiosSecure
  //     .post(`/studySessions/resend/${sessionId}`)
  //     .then((response) => {
  //       toast.success(response.data.message);
  //       setSessions((prevSessions) =>
  //         prevSessions.map((session) =>
  //           session._id === sessionId ? { ...session, status: "pending" } : session
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error resending request:", error);
  //       toast.error("Failed to resend request.");
  //     });
  // };
  const handleResendRequest = (sessionId) => {
    axiosSecure
      .patch(`/studySessions/resend/${sessionId}`)
      .then((response) => {
        toast.success(response.data.message);
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === sessionId ? { ...session, status: "pending" } : session
          )
        );
      })
      .catch((error) => {
        console.error("Error resending request:", error);
        toast.error("Failed to resend request.");
      });
};
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-72">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center my-5">View All Study Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-center text-xl">No sessions available.</p>
      ) : (
        <div className="w-[98%] md:w-10/12 mx-auto">
          {/* Approved Sessions */}
          <h3 className="text-2xl font-bold text-green-600 my-4">Approved Sessions</h3>
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-green-500 text-white uppercase">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Session Title</th>
                <th className="px-6 py-4">Tutor Email</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.filter(session => session.status === "approved").map((session, index) => (
                <tr key={session._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{session.sessionTitle}</td>
                  <td className="border px-4 py-2">{session.tutorEmail}</td>
                  <td className="border px-4 py-2 text-green-500 font-semibold text-center">{session.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pending Sessions */}
          <div className="my-16">
          <h3 className="text-2xl font-bold text-yellow-600 my-4">Pending Sessions</h3>
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-yellow-500 text-white uppercase">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Session Title</th>
                <th className="px-6 py-4">Tutor Email</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.filter(session => session.status === "pending").map((session, index) => (
                <tr key={session._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{session.sessionTitle}</td>
                  <td className="border px-4 py-2">{session.tutorEmail}</td>
                  <td className="border px-4 py-2 text-yellow-500 font-semibold text-center">{session.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {/* Rejected Sessions with Resend Button */}
          <h3 className="text-2xl font-bold text-red-600 my-4">Rejected Sessions</h3>
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-red-500 text-white uppercase">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Session Title</th>
                <th className="px-6 py-4">Tutor Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.filter(session => session.status === "rejected").map((session, index) => (
                <tr key={session._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{session.sessionTitle}</td>
                  <td className="border px-4 py-2">{session.tutorEmail}</td>
                  <td className="border px-4 py-2 text-red-500 font-semibold text-center">{session.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleResendRequest(session._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Resend Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewSessions;
