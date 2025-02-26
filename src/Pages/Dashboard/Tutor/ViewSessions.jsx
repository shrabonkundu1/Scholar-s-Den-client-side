

import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ViewSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState(null);

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

  const handleResendRequest = (sessionId) => {
    axiosSecure
      .patch(`/studySessions/resend/${sessionId}`)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Resend this session successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === sessionId
              ? { ...session, status: "pending" }
              : session
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
      <h2 className="text-4xl font-semibold font-Cinzel text-center my-16 ">
        View All Study Sessions
      </h2>

      {sessions.length === 0 ? (
        <p className="text-center text-xl">No sessions available.</p>
      ) : (
        <div className="w-[98%] md:w-10/12 mx-auto my-24">
          {/* Approved Sessions */}
          <h3 className="text-2xl font-bold text-green-600 my-4">
            Approved Sessions
          </h3>
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-green-500 text-white uppercase">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Session Title</th>
                <th className="px-6 py-4">Tutor Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions
                .filter((session) => session.status === "approved")
                .map((session, index) => (
                  <tr key={session._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{session.sessionTitle}</td>
                    <td className="border px-4 py-2">{session.tutorEmail}</td>
                    <td className="border px-4 py-2 text-green-500 font-semibold text-center">
                      {session.status}
                    </td>
                    <td>
                      <Link to={"/dashboard/addMaterials"} state={session}>
                        {" "}
                        <button className="px-4 py-3 rounded-lg border ml-16 my-2 hover:bg-green-300 border-green-300">
                          Upload Material
                        </button>{" "}
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pending Sessions */}
          <div className="my-16">
            <h3 className="text-2xl font-bold text-yellow-600 my-4">
              Pending Sessions
            </h3>
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
                {sessions
                  .filter((session) => session.status === "pending")
                  .map((session, index) => (
                    <tr key={session._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        {session.sessionTitle}
                      </td>
                      <td className="border px-4 py-2">{session.tutorEmail}</td>
                      <td className="border px-4 py-2 text-yellow-500 font-semibold text-center">
                        {session.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Rejected Sessions with Resend Button */}
          <h3 className="text-2xl font-bold text-red-600 my-4">
            Rejected Sessions
          </h3>
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
              {sessions
                .filter((session) => session.status === "rejected")
                .map((session, index) => (
                  <tr key={session._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{session.sessionTitle}</td>
                    <td className="border px-4 py-2">{session.tutorEmail}</td>
                    <td className="border px-4 py-2 text-red-500 font-semibold text-center">
                      {session.status}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleResendRequest(session._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Resend 
                      </button>
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md"
                      >
                        Feedback
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

{selectedSession && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h3 className="text-xl text-center font-semibold mb-2">Feedback Details</h3>
      <p><strong>Rejection Reason:</strong> {selectedSession.rejectionReason}</p>
      <p><strong>Feedback:</strong> {selectedSession.feedback}</p>
      <button 
        onClick={() => setSelectedSession(null)} 
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default ViewSessions;
