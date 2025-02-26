import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SessionCard from "../SessionCard/SessionCard";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";

const AllSession = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const sessionsPerPage = 10;

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["allStudySessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allStudySessions");
      return res.data;
    },
  });

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

  const pageCount = Math.ceil(sessions.length / sessionsPerPage);
  const offset = currentPage * sessionsPerPage;
  const currentSessions = sessions.slice(offset, offset + sessionsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
    <h2 className="md:text-5xl text-3xl font-semibold text-center font-Cinzel pt-28">
        All Study Sessions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-4/5 md:w-11/12 w-[95%] mx-auto my-16">
        {currentSessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))}
      </div>

      <div className="flex justify-center my-10">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-4 text-lg"}
          activeClassName={"font-bold text-blue-500"}
          previousClassName={"px-4 py-2 bg-gray-200 rounded"}
          nextClassName={"px-4 py-2 bg-gray-200 rounded"}
          disabledClassName={"text-gray-400"}
        />
      </div>
    </div>
  );
};

export default AllSession;
