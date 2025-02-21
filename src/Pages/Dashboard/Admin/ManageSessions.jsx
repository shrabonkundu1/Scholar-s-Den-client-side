


import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManageSessions = () => {
    const [sessions, setSessions] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get("/admin/allSessions")
            .then((res) => setSessions(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleApprove = (session) => {
        Swal.fire({
            title: "Approve Session",
            text: "Do you want to approve this session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
            input: "checkbox",
            inputValue: false,
            inputPlaceholder: "Is this session paid?"
        }).then((result) => {
            if (result.isConfirmed) {
                const isPaid = result.value;
                let amount = 0;
                
                if (isPaid) {
                    Swal.fire({
                        title: "Enter Amount",
                        input: "number",
                        inputAttributes: { min: 0 },
                        showCancelButton: true,
                    }).then((amountResult) => {
                        if (amountResult.isConfirmed) {
                            amount = Number(amountResult.value);
                            approveSession(session, isPaid, amount);
                        }
                    });
                } else {
                    approveSession(session, false, 0);
                }
            }
        });
    };

    const approveSession = (session, isPaid, amount) => {
        axiosSecure
            .patch(`/admin/allSessions/approve/${session._id}`, { isPaid, amount })
            .then(() => {
                setSessions(sessions.filter((s) => s._id !== session._id));
                Swal.fire("Approved!", "The session has been approved.", "success");
            })
            .catch((err) => console.error(err));
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/admin/allSessions/reject/${id}`).then(() => {
                    setSessions(sessions.filter((session) => session._id !== id));
                    Swal.fire("Rejected!", "The session has been rejected.", "success");
                }).catch((err) => console.error(err));
            }
        });
    };

    return (
        <div>
            <h2 className="text-4xl font-Cinzel text-center my-16 font-semibold">Pending Study Sessions</h2>


             <div className="overflow-x-auto my-8 mx-16">
                      <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
                        {/* head */}
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
                              <td className="px-6 py-4">
                                <p>{session.sessionTitle}</p>
                              </td>
                              <td className="px-6 py-4">{session.tutorEmail}</td>
                              
                              <td className="px-6 py-4">
                              <button
                        onClick={() => handleApprove(session)}
                        className="border-[#6feccb] hover:bg-[#5bf0c8] border hover:text-white px-4 py-1 rounded-full"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleReject(session._id)}
                        className="border-red-500 border hover:bg-red-500 hover:text-white px-4 py-1 ml-2 rounded-full"
                    >
                        Reject
                    </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

{/* 
            {sessions.map((session) => (
                <div key={session._id} className="p-4 border">
                    <h3>{session.sessionTitle}</h3>
                    <button
                        onClick={() => handleApprove(session)}
                        className="bg-green-500 text-white px-4 py-1"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleReject(session._id)}
                        className="bg-red-500 text-white px-4 py-1 ml-2"
                    >
                        Reject
                    </button>
                </div>
            ))} */}
        </div>
    );
};

export default ManageSessions;
