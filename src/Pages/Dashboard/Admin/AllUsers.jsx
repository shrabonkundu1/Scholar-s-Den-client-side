

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["users", search], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUpdateRole = (user) => {
    let newRole = "tutor";

    if (user.role === "tutor") {
      newRole = "admin";
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to update ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, update to ${newRole}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`, { role: newRole })
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: `${user.name} is now ${newRole}.`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

  if (isLoading) {
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
    <div>
      <div className="w-full">
        <h2 className="md:text-5xl text-3xl font-Cinzel font-semibold text-center mt-16">
          All Users
        </h2>
        <div className="flex gap-2 my-10 justify-center items-center">
          <input
            type="text"
            placeholder="Search user by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-max rounded-md"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>
      <div className="card bg-white rounded-xs w-full md:w-9/12 py-8 my-24 mx-auto">
        <div className="flex justify-around items-center">
          <h2 className="text-3xl font-semibold font-Cinzel">
            Total Users : {users.length}
          </h2>
        </div>
        <div className="overflow-x-auto my-8 mx-16">
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-[#6feccb] text-white text-left uppercase">
              <tr className="rounded-t-xl">
                <th className="px-6 py-4 rounded-tl-lg">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <th className="px-6 py-4">{offset + index + 1}</th>
                  <td className="px-6 py-4">
                    <p>{user.name}</p>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                      onClick={() => handleUpdateRole(user)}
                        className="bg-[#6feccb] p-4 rounded-lg"
                      >
                        {user.role}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                     onClick={() => handleDeleteUser(user)}
                      className="w-10 h-10 grid items-center justify-center cursor-pointer bg-red-500 text-white rounded-lg ml-10"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-center my-10'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'flex space-x-4 text-lg'}
          activeClassName={'font-bold text-blue-500'}
          previousClassName={'px-4 py-2 bg-gray-200 rounded'}
          nextClassName={'px-4 py-2 bg-gray-200 rounded'}
          disabledClassName={'text-gray-400'}
        />
      </div>
    </div>
  );
};

export default AllUsers;
