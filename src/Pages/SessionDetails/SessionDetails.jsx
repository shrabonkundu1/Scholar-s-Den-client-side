
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const SessionDetails = () => {
  const { loading, user } = useAuth();
  const [isBooked, setIsBooked] = useState(false);
  const [sessions, setSessions] = useState(null);
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    axiosSecure.get(`/studySessions/${id}`).then((res) => {
      setSessions(res.data);
    });

    axiosSecure
      .get(`/reviews`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          const filteredReviews = res.data.filter(
            (review) => review.sessionId === id
          );
          setReviews(filteredReviews);
        } else if (res.data.reviews) {
          const filteredReviews = res.data.reviews.filter(
            (review) => review.sessionId === id
          );
          setReviews(filteredReviews);
        } else {
          setReviews([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      });
  }, [id, axiosSecure]);

  useEffect(() => {
    if (sessions?.session?._id && user) {
      checkBookedSession();
    }
  }, [sessions, user]);

  const checkBookedSession = async () => {
    if (!user || !sessions?.session?._id) return;

    try {
      const { data } = await axiosSecure.get(
        `/checkBookedSession?studentEmail=${user.email}&sessionId=${sessions.session._id}`
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
  
 
      try {
        const { data } = await axiosPublic.post("/bookedSessions", {
          studentEmail: user.email,
          sessionId: sessions.session._id,
          sessionTitle: sessions.session.sessionTitle,
          tutorName: sessions.session.tutorName,
          sessionDuration: sessions.session.sessionDuration,
        });
  
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

  const data = sessions.session;
  const {
    sessionTitle,
    tutorName,
    sessionDescription,
    registrationStartDate,
    classEndDate,
    classStartTime,
    registrationEndDate,
    sessionDuration,
    status,
    amount,
  } = data;

  const currentUser = users.find((u) => u.email === user?.email) || {};
  const isRegistrationClosed = new Date() > new Date(registrationEndDate);
  const isDisabled =
    isRegistrationClosed ||
    currentUser?.role === "admin" ||
    currentUser?.role === "tutor";

  return (
    <div className="py-16">
      <h2 className="md:text-4xl text-3xl py-16 font-semibold font-Cinzel text-center">
        {sessionTitle}
      </h2>
      <div className="md:w-3/4 mx-5 md:mx-auto md:text-xl font-medium space-y-6">
        <p>
          Description: <span className="font-light">{sessionDescription}</span>
        </p>
        <div className="flex flex-col md:flex-row justify-between md:items-center w-4/5">
          <h2>Title: {sessionTitle}</h2>
          <p>
            Session Status: <span className="font-light">{status}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center w-4/5">
          <p>
            Tutor: <span>{tutorName}</span>
          </p>
          <p>
            Session Duration:{" "}
            <span className="font-light">{sessionDuration}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center w-4/5">
          <p>
            Registration Starts:{" "}
            <span className="font-light">{registrationStartDate}</span>
          </p>
          <p>
            Registration Ends:{" "}
            <span className="font-light">{registrationEndDate}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center w-4/5">
          <p>
            Class Starts: <span className="font-light">{classStartTime}</span>
          </p>
          <p>
            Class Ends: <span className="font-light">{classEndDate}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center w-4/5">
          <p>
            Registration Fee: <span className="font-light">${amount}</span>
          </p>
          {status === "approved" ? (
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
          ) : (
            <button
              disabled
              className="btn bg-gray-400 cursor-not-allowed text-white"
            >
              Book Now
            </button>
          )}
        </div>

        <div className="pt-16">
          <h2 className="text-2xl font-semibold">Student Reviews:</h2>
          {reviews?.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="border p-3 my-2 rounded-lg ">
                <p className="font-bold">{review.studentName}</p>
                <p>{review.comment}</p>
                <p>⭐ {review.rating}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
