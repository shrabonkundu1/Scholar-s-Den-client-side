import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const BookSession = () => {
    const {user} = useAuth()
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const studentEmail = user?.email;
    useEffect(() => {
    axiosPublic
      .get(`/bookedSessions/${studentEmail}`)
      .then((res) => setSessions(res.data))
      .catch((error) => console.error("Error fetching sessions:", error));
  }, [studentEmail, axiosPublic]);
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center mt-72">
  //       <span className="loading loading-ring loading-xs"></span>
  //       <span className="loading loading-ring loading-sm"></span>
  //       <span className="loading loading-ring loading-md"></span>
  //       <span className="loading loading-ring loading-lg"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-semibold font-Cinzel text-center my-16 ">Our Booked Session</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No Booked Session avialable</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <div key={session._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{session.sessionTitle}</h3>
              <p className="text-gray-600">Tutor: {session.tutorName}</p>
              <p className="text-gray-600">Session Duration: {session.sessionDuration}</p>
             <div>
             <Link to={`/dashboard/bookStudySessions/${session.sessionId}`}> <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              > View Details</button></Link>
              <Link to={`/dashboard/viewStudyMaterials/${session.sessionId}`}> <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              > View Materials</button></Link>
             </div>
            
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSession;
