import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ViewMaterials = () => {
  const { user } = useAuth();
  const [loading,setLoading] = useState(true)
  const [materials, setMaterials] = useState([]);
  const axiosSecure = useAxiosSecure();
console.log(materials)
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/materials/${user.email}`).then((res) => {
      setMaterials(res.data);
      setLoading(false)
    });
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/materials/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Material deleted successfully!",
              icon: "success"
            });
            setMaterials(materials.filter((material) => material._id !== id));
          }
        });
      }
    });
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
    <div className="w-[90%] mx-auto my-10">
      <h2 className="text-4xl font-semibold font-Cinzel text-center my-16 ">Your Uploaded Materials</h2>
      <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-green-500 text-white uppercase">
          <tr>
            <th className="px-6 py-4">Session Id</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Google Drive Link</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center">
          {materials.map((material) => (
            <tr key={material._id} className="border-b">
              <td className="px-4 py-2">{material.sessionId}</td>
              <td className="px-4 py-2">{material.title}</td>
              <td className="px-4 py-2">
                <img src={material.image} alt="Material" className="w-16 h-16 object-cover" />
              </td>
              <td className="px-4 py-2">
                <a href={material.googleDriveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
              </td>
              <td className="px-4 py-2 flex justify-evenly mt-5 items-center">
                <button onClick={() => handleDelete(material._id)} className="text-white w-12 h-12 grid justify-center items-center rounded-lg bg-red-500"><FaTrash size={19}></FaTrash></button>
                <Link to={`/dashboard/updateMaterial/${material._id}`} className="ml-4 text-white w-12 h-12 grid justify-center items-center rounded-lg bg-blue-500"><button><FaEdit size={19}></FaEdit></button></Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
    </div>
  );
};

export default ViewMaterials;
