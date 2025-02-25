import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageApprovedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/admin/approvedSessions")
      .then((res) => setSessions(res.data))
      .catch((err) => console.error("Error fetching approved sessions:", err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This session will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/admin/deleteSession/${id}`)
          .then(() => {
            setSessions(sessions.filter((session) => session._id !== id));
            Swal.fire("Deleted!", "The session has been removed.", "success");
          })
          .catch((err) => console.error("Error deleting session:", err));
      }
    });
  };

  const handleUpdate = async (session) => {
    const result = await Swal.fire({
      title: "Update Session amount",
      input: "number",
      inputValue: session.amount || 0,
      inputAttributes: { min: 0 },
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      axiosSecure
        .patch(`/admin/updateSession/${session._id}`, {
          amount: Number(result.value),
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            setSessions(
              sessions.map((s) =>
                s._id === session._id
                  ? { ...s, amount: Number(result.value) }
                  : s
              )
            );
            Swal.fire(
              "Updated!",
              "Session amount updated successfully.",
              "success"
            );
          }
        })
        .catch((err) => {
          console.error("Error updating session:", err);
          Swal.fire("Error!", "Failed to update amount.", "error");
        });
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-Cinzel text-center my-16 font-semibold">
        Approved Study Sessions
      </h2>

      <div className="overflow-x-auto my-8 md:mx-16">
        <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#6feccb] text-white text-left uppercase">
            <tr className="rounded-t-xl">
              <th className="px-6 py-4 rounded-tl-lg">#</th>
              <th className="px-6 py-4">Session Title</th>
              <th className="px-6 py-4">Tutor Email</th>
              <th className="px-6 py-4 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sessions.map((session, index) => (
              <tr key={session._id} className="hover:bg-gray-100">
                <th className="px-6 py-4">{index + 1}</th>
                <td className="px-6 py-4">{session.sessionTitle}</td>
                <td className="px-6 py-4">{session.tutorEmail}</td>
                <td className="px-6 py-4">
                  <button
                    className="border-blue-500 border hover:bg-blue-500 hover:text-white px-4 py-1 rounded-full"
                    onClick={() => handleUpdate(session)}
                  >
                    Update
                  </button>
                  <button
                    className="border-red-500 border hover:bg-red-500 hover:text-white px-4 py-1 ml-2 rounded-full"
                    onClick={() => handleDelete(session._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApprovedSessions;
