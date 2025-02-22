import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";

const UpdateMaterial = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [material, setMaterial] = useState({ title: "", image: "", googleDriveLink: "" });

  useEffect(() => {
    axiosSecure.get(`/materials/${id}`).then((res) => {
      setMaterial(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosSecure.put(`/materials/${id}`, material).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Material updated successfully!");
        navigate("/dashboard/viewMaterials");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Update Material</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={material.title} onChange={handleChange} className="w-full border p-2 mb-2" placeholder="Title" />
        <input type="text" name="image" value={material.image} onChange={handleChange} className="w-full border p-2 mb-2" placeholder="Image URL" />
        <input type="text" name="googleDriveLink" value={material.googleDriveLink} onChange={handleChange} className="w-full border p-2 mb-2" placeholder="Google Drive Link" />
        <button type="submit" className="w-full bg-green-400 text-white py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default UpdateMaterial;
