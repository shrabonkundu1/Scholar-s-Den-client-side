// import React from "react";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
// import { useForm } from "react-hook-form";
// import { FaUtensils } from "react-icons/fa";
// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
// const CreateSessions = () => {
//     const axiosPublic = useAxiosPublic();
//     const axiosSecure = useAxiosSecure();
//     const { register, handleSubmit ,reset} = useForm();
//     const onSubmit = async(data) => {
//       console.log(data);
//       const imageFile = {image : data.image[0]}
//       const res =  await axiosPublic.post(image_hosting_api,imageFile,{
//         headers:{
//           "Content-Type": "multipart/form-data"
//         }
//       })
//       if(res.data.success){
//         const sessionDetails = {
//           name : data.name,
//           recipe : data.recipe,
//           price : parseFloat(data.price),
//           category : data.category,
//           image : res.data.data.display_url
//         }
//         const newSession = await axiosSecure.post('/studySessions',sessionDetails);
//         console.log(newSession.data)
//         if(newSession.data.insertedId){
//           reset()
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: " New Item Created",
//             showConfirmButton: false,
//             timer: 1500
//           });
//         }
//       }
//       console.log(res.data)
//     };
//   return (
//     <div>
//         <div>
//             <h2 className="text-4xl md:text-4xl font-Cinzel font-semibold my-16 text-center">Create A New Session</h2>
//         </div>
//         <div className="w-9/12 mx-auto my-24 bg-gray-200 rounded-md">
//       <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text font-medium text-xl">Session Title*</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Session title"
//             {...register("sessionTitle", { required: true })}
//             className="input input-bordered w-full rounded-md"
//           />
//         </label>
//         <div className="flex flex-col md:flex-row gap-8 justify-center items-center my-4">
//           <label className="form-control w-full ">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Tutor Name*</span>
//             </div>
//             <input
//               type="text"
//               {...register("price", { required: true })}
//               placeholder="Select Price"
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//           <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Tutor Email*</span>
//             </div>
//             <input
//               type="text"
//               {...register("price", { required: true })}
//               placeholder=""
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//         </div>
//         <div className="flex flex-col md:flex-row gap-8 justify-center items-center my-4">
//           <label className="form-control w-full ">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Registration Start Date*</span>
//             </div>
//             <input
//               type="date"
//               {...register("registrationStartDate", { required: true })}
//               placeholder="date"
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//           <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Registration End Date*</span>
//             </div>
//             <input
//               type="date"
//               {...register("registrationEndDate", { required: true })}
//               placeholder=""
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//           <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Status*</span>
//             </div>
//             <input
//               type="text"
//               {...register("status", { required: true })}
//               placeholder="Status"
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//         </div>
//         <div className="flex flex-col md:flex-row gap-8 justify-center items-center my-4">
//           <label className="form-control w-full ">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Class Start Date*</span>
//             </div>
//             <input
//               type="date"
//               {...register("classStartTime", { required: true })}
//               placeholder="date"
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//           <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Class End Date*</span>
//             </div>
//             <input
//               type="date"
//               {...register("classEndDate", { required: true })}
//               placeholder=""
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//           <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Session Duration*</span>
//             </div>
//             <input
//               type="text"
//               {...register("sessionDuration", { required: true })}
//               placeholder="Session Duration"
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//         </div>
//         <label className="form-control w-full">
//           <div className="label">
//             <span className="label-text font-medium text-xl">
//               Session Description*
//             </span>
//           </div>
//           <textarea
//             placeholder="Session Details"
//             {...register("sessionDescription", { required: true })}
//             className="textarea textarea-bordered textarea-lg w-full h-[150px] rounded-md "
//           ></textarea>
//         </label>
//        <div className="flex flex-col md:flex-row gap-8 justify-center items-center my-4">
//        <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Image File*</span>
//             </div>
//             <input
//           type="file"
//           {...register("image", { required: true })}
//           className="file-input w-full max-w-xs "
//         />
//           </label>
       
//          <label className="form-control w-full">
//             <div className="label">
//               <span className="label-text font-medium text-xl">Registration Fee*</span>
//             </div>
//             <input
//               type="number"
//               {...register("sessionDuration", { required: true })}
//               placeholder=""
//               className="input input-bordered w-full rounded-md"
//             />
//           </label>
//        </div>
//         <br />
//         {/* <input  type="submit" /> */}
//         <button className="px-8 rounded-md my-4 py-3 bg-gradient-to-r from-amber-700 to-orange-600 text-white font-bold flex justify-center items-center gap-2">
//           Add Item <FaUtensils />{" "}
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default CreateSessions;
import React from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { FaChalkboardTeacher } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth"; 

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateSessions = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const res = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
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
        image: res.data.data.display_url, 
      };

      const newSession = await axiosSecure.post("/studySessions", sessionDetails);
      console.log("Session Created:", newSession.data);

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
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold my-10 text-center">
        Create A New Study Session
      </h2>
      <div className="w-9/12 mx-auto bg-gray-200 rounded-md p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Session Title */}
          <label className="form-control w-full">
            <span className="label-text font-medium text-xl">Session Title*</span>
            <input
              type="text"
              {...register("sessionTitle", { required: true })}
              placeholder="Enter session title"
              className="input input-bordered w-full rounded-md"
            />
          </label>

          {/* Tutor Name & Email (Read-Only) */}
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

          {/* Registration Dates */}
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

          {/* Class Dates */}
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
             {/* Session Duration */}
          <label className="form-control w-full">
            <span className="label-text font-medium text-xl">Session Duration*</span>
            <input
              type="text"
              {...register("sessionDuration", { required: true })}
              placeholder="Enter session duration"
              className="input input-bordered w-full rounded-md"
            />
          </label>
          </div>

         

          {/* Session Description */}
          <label className="form-control w-full my-4">
            <span className="label-text font-medium text-xl">Session Description*</span>
            <textarea
              {...register("sessionDescription", { required: true })}
              className="textarea textarea-bordered w-full rounded-md h-32"
              placeholder="Describe the session"
            ></textarea>
          </label>

          {/* Image Upload */}
          <label className="form-control w-full">
            <span className="label-text font-medium text-xl">Image File*</span>
            <input
              type="file"
              {...register("image")}
              className="file-input w-full max-w-xs"
            />
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

          {/* Submit Button */}
          <button className="px-8 py-3 rounded-md bg-gradient-to-r from-green-700 to-green-500 text-white font-bold flex justify-center items-center gap-2">
            Create Session <FaChalkboardTeacher />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSessions;
