import React, { useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import AOS from "aos";
import "aos/dist/aos.css";
const Notes = () => {
    const { user } = useAuth(); 
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();  
    const onSubmit = async (data) => {
      try {
        const response = await axiosSecure.post("/notes", data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Note added successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        reset();
      } catch (error) {
        alert("Note not save!");
      }
    };
    useEffect(() => {
      AOS.init({
        duration: 1500, 
        easing: "ease-out-quart", 
        // easing: "ease-in-out"
      });
    }, []);
    return (
        <div className="max-w-xl mx-auto px-10 p-6 bg-green-300 shadow-lg rounded-lg my-16" data-aos="zoom-in">
        <h2 className="text-3xl font-semibold font-Cinzel text-center my-16">Create New Note</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <input
            type="email"
            value={user?.email}
            readOnly
            {...register("email")}
            className="w-full p-2 mb-3 border rounded bg-gray-100"
          />
  
          {/* Title Field */}
          <input
            type="text"
            placeholder="Input Note Title"
            {...register("title", { required: "Title is required!" })}
            className="w-full  p-2 mb-3 border rounded" 
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
  
          {/* Description Field */}
          <textarea
            placeholder="Input your note"
            {...register("description", { required: "Description is requard" })}
            className="w-full p-2 mb-3 border rounded" rows={6}
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
  
          {/* Submit Button */}
          <button type="submit" className="px-4 py-2 bg-white text-green-400 font-semibold hover:scale-105 rounded">
           Submit
          </button>
        </form>
      </div>
  
    );
};

export default Notes;