import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axiosSecure.get("/materials")
    .then((res) => setMaterials(res.data));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/materials/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Material has been deleted.", "success");
            setMaterials(materials.filter((material) => material._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-semibold font-Cinzel text-center my-16">Manage Materials</h2>
      <div className="overflow-x-auto my-8 mx-16">
        <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#41ddb4] text-white text-left uppercase">
              <tr className="rounded-t-xl">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Tutor Email</th> 
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
          <tbody className="divide-y divide-gray-200">
            {materials.map((material, index) => (
              <tr key={material._id} className="border">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{material.title}</td>
                <td className="border px-4 py-2">{material.tutorEmail}</td>
                <td className="border px-4 py-2 text-center">
                  <img src={material.image} alt={material.title} className="w-16 h-16 object-cover mx-auto" />
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(material._id)}
                    className="btn btn-error btn-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMaterials;
