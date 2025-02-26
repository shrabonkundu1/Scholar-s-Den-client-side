import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddMaterials = () => {
  const { register, handleSubmit, reset } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false); 

  // get session data using location state
  const session = location.state || null;

  useEffect(() => {
    if (!session) {
      navigate("/dashboard/viewSessions");
    }
  }, [session, navigate]);

  const onSubmit = async (data) => {
    setLoading(true); 
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgBBUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;
    try {
      const response = await fetch(imgBBUrl, {
        method: "POST",
        body: formData,
      });
      const imgData = await response.json();

      if (imgData.success) {
        const newMaterial = {
          title: data.title,
          sessionId: session._id,
          tutorEmail: session.tutorEmail,
          image: imgData.data.url,
          googleDriveLink: data.googleDriveLink,
        };

        const res = await axiosSecure.post("/materials", newMaterial);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Material uploaded successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          navigate("/dashboard/viewMaterials");
        }
      }
    } catch (error) {
      console.error("Error uploading material:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong! Please try again.",
      });
    } finally {
      setLoading(false); 
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-72">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Upload Study Material</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} placeholder="Title" className="input input-bordered w-full" />
        <input value={session?._id || ""} readOnly className="input input-bordered w-full bg-gray-200" />
        <input value={session?.tutorEmail || ""} readOnly className="input input-bordered w-full bg-gray-200" />
        <input {...register("image", { required: true })} type="file" className="file-input w-full" />
        <input {...register("googleDriveLink", { required: true })} placeholder="Google Drive Link" className="input input-bordered w-full" />
        
        <button type="submit" className="btn bg-green-400 w-full">
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddMaterials;
