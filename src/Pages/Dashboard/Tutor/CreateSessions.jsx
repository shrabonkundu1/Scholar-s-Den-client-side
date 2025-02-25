
import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaChalkboardTeacher } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth"; 

const CreateSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {

    const sessionDetails = {
      sessionTitle: data.sessionTitle,
      tutorName: user?.displayName, 
      tutorEmail: user?.email, 
      sessionDescription: data.sessionDescription,
      registrationStartDate: data.registrationStartDate,
      registrationEndDate: data.registrationEndDate,
      classStartTime: data.classStartTime,
      classEndDate: data.classEndDate,
      sessionDuration: data.sessionDuration,
      registrationFee: 0,
      status: "pending", 
    };

    const newSession = await axiosSecure.post("/studySessions", sessionDetails);

    if (newSession.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Study Session Created",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h2 className="md:text-4xl text-3xl mx-5 md:mx-0 font-semibold my-10 text-center">
        Create A New Study Session
      </h2>
      <div className="w-[92%] md:w-9/12 mx-auto bg-gray-200 rounded-md p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <span className="label-text font-medium text-xl">Session Title*</span>
            <input
              type="text"
              {...register("sessionTitle", { required: true })}
              placeholder="Enter session title"
              className="input input-bordered w-full rounded-md"
            />
          </label>

          <div className="flex flex-col md:flex-row gap-6 my-4">
            <label className="form-control w-full">
              <span className="label-text font-medium text-xl">Tutor Name*</span>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-300 rounded-md"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text font-medium text-xl">Tutor Email*</span>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-300 rounded-md"
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row gap-6 my-4">
            <label className="form-control w-full">
              <span className="label-text font-medium text-xl">Registration Start Date*</span>
              <input
                type="date"
                {...register("registrationStartDate", { required: true })}
                className="input input-bordered w-full rounded-md"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text font-medium text-xl">Registration End Date*</span>
              <input
                type="date"
                {...register("registrationEndDate", { required: true })}
                className="input input-bordered w-full rounded-md"
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row gap-6 my-4">
            <label className="form-control w-full">
              <span className="label-text font-medium text-xl">Class Start Date*</span>
              <input
                type="date"
                {...register("classStartTime", { required: true })}
                className="input input-bordered w-full rounded-md"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text font-medium text-xl">Class End Date*</span>
              <input
                type="date"
                {...register("classEndDate", { required: true })}
                className="input input-bordered w-full rounded-md"
              />
            </label>
          </div>

          <label className="form-control w-full">
            <span className="label-text font-medium text-xl">Session Duration*</span>
            <input
              type="text"
              {...register("sessionDuration", { required: true })}
              placeholder="Enter session duration"
              className="input input-bordered w-full rounded-md"
            />
          </label>

          <label className="form-control w-full my-4">
            <span className="label-text font-medium text-xl">Session Description*</span>
            <textarea
              {...register("sessionDescription", { required: true })}
              className="textarea textarea-bordered w-full rounded-md h-32"
              placeholder="Describe the session"
            ></textarea>
          </label>

          <label className="form-control w-full my-4">
            <span className="label-text font-medium text-xl">Registration Fee*</span>
            <input
              type="number"
              value={0} 
              readOnly
              className="input input-bordered w-full bg-gray-300 rounded-md"
            />
          </label>

          <button className="px-8 py-3 rounded-md bg-gradient-to-r from-green-700 to-green-500 text-white font-bold flex justify-center items-center gap-2">
            Create Session <FaChalkboardTeacher />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSessions;