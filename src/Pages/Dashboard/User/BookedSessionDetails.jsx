
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth"; 
import Swal from "sweetalert2"; 
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const BookedSessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 

  const [session, setSession] = useState({});
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
      } = session;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    axiosSecure
      .get(`/bookStudySessions/${id}`)
      .then((res) => setSession(res.data))
      .catch((error) => console.error("Error fetching session details:", error));
  }, [id, axiosSecure]);

  const onSubmit = async (data) => {
    const newReview = {
      sessionId: id,
      studentName: user?.displayName, 
      rating: parseFloat(data.rating),
      comment: data.comment,
    };

    try {
      const response = await axiosSecure.post("/reviews", newReview);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Your review has been added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        reset();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="py-16">
      <h2 className="text-4xl py-16 font-semibold font-Cinzel text-center">
        {session.sessionTitle}
      </h2>

      <div className="w-[80%] justify-center mx-auto text-xl font-medium space-y-6">
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
      </div>
    </div>


      <div className="mx-auto mt-16 p-6 border rounded-lg shadow-lg w-[50%]">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add a Review</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Reviewer Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />

        </div>
          
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            placeholder="Rating (1 to 5)"
            {...register("rating", { required: true })}
            className="w-full p-2 border rounded-md"
          />
          {errors.rating && <p className="text-red-500">Rating is required</p>}

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Review</span>
          </label>
          <textarea
            placeholder="Write your review here..."
            {...register("comment", { required: true })}
            className="w-full p-2 border rounded-md"
          />
          {errors.comment && <p className="text-red-500">Comment is required</p>}

        </div>
          
          

         

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookedSessionDetails;
