import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const TutorHome = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newImage, setNewImage] = useState(user?.photoURL || "");

//   const handleUpdate = async () => {
//     try {
//       const updatedData = { displayName: newName };
//       const res = await axiosSecure.patch(`/users/${user.email}`, updatedData);
//       if (res.data.modifiedCount > 0) {
//         Swal.fire({
//                 icon: "Success",
//                 title: " Update successfully",
//               });
//         setUser((prev) => ({ ...prev, ...updatedData }));
//         setEditing(false);
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update profile.");
//     }
//   };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Tutor Dashboard</h2>
      <img src={user?.photoURL} alt="User" className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300" />
      <p className="text-lg font-semibold mt-2">{user?.displayName}</p>
      <p className="text-gray-500">{user?.email}</p>
      <p className="text-blue-600 font-medium">Role: Tutor</p>
      <button onClick={() => setEditing(true)} className="mt-4 btn btn-primary">Update Profile</button>

      {/* {editing && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <input
            type="text"
            value={newName}
            defaultValue={user.displayName}
            onChange={(e) => setNewName(e.target.value)}
            className="input input-bordered w-full mb-2"
            placeholder="New Name"
          />
          <div className="flex justify-between">
            <button onClick={handleUpdate} className="btn btn-success">Save</button>
            <button onClick={() => setEditing(false)} className="btn btn-error">Cancel</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TutorHome;