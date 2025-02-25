


import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [feedback, setFeedback] = useState("");

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
        setSelectedSessionId(id);
        setShowModal(true);
    };

    const handleConfirmReject = () => {
        if (!rejectionReason || !feedback) {
            alert("Both rejection reason and feedback are required!");
            return;
        }

        axiosSecure
            .patch(`/admin/allSessions/reject/${selectedSessionId}`, { rejectionReason, feedback })
            .then(() => {
                setSessions((prevSessions) => prevSessions.filter((session) => session._id !== selectedSessionId));
                setShowModal(false);
                Swal.fire("Rejected!", "The session has been rejected.", "success");
            })
            .catch((err) => console.error("Error Rejecting Session:", err));
    };

    return (
        <div>
            <h2 className="text-2xl md:text-4xl font-Cinzel text-center my-16 font-semibold">Pending Study Sessions</h2>

            <div className="overflow-x-auto my-8 md:mx-16">
                <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-[#6feccb] text-white text-left uppercase">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Session Title</th>
                            <th className="px-6 py-4">Tutor Email</th>
                            <th className="px-6 py-4">Action</th>
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

            {/* Reject Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Reject Study Session</h3>
                        <label className="block mb-2 text-gray-700">Rejection Reason</label>
                        <input
                            type="text"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                        />
                        <label className="block mb-2 text-gray-700">Feedback for Tutor</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmReject}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSessions;
