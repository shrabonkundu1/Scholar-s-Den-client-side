import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Notes = () => {
    const { user } = useAuth(); 
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
  
    const onSubmit = async (data) => {
      try {
        const response = await axiosPublic.post("/createNote", data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Note added successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        console.log(response.data.message)
        reset();
      } catch (error) {
        alert("Note not save!");
      }
    };
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-16">
        <h2 className="text-xl font-bold mb-4">Create New Note</h2>
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
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
           Submit
          </button>
        </form>
      </div>
  
    );
};

export default Notes;