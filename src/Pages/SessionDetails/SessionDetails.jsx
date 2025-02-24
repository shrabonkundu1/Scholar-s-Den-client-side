import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
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

  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    axiosPublic.get(`/studySessions/${id}`).then((res) => {
      setSessions(res.data);
    });

    axiosPublic
      .get(`/reviews`)
      .then((res) => {
        console.log("Reviews Response:", res.data);
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
  }, [id, axiosPublic]);

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
      const { data } = await axiosPublic.post("/bookedSessions", bookingData);

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

  console.log(reviews);
  const data = sessions.session;
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
  } = data;

  const currentUser = users.find((u) => u.email === user?.email) || {};
  const isRegistrationClosed = new Date() > new Date(registrationEndDate);
  const isDisabled =
    isRegistrationClosed ||
    currentUser?.role === "admin" ||
    currentUser?.role === "tutor";

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
            Registration Fee :{" "}
            <span className="font-light">{registrationFee}</span>
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
