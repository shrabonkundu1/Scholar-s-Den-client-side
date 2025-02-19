import React from "react";
import { Link } from "react-router-dom";
import { compareAsc, parseISO } from "date-fns";

const SessionCard = ({ session }) => {

  //  

  const {
    sessionTitle,
    sessionDescription,
    registrationStartDate,
    registrationEndDate,
    _id
  } = session;

  // cheak date status:
  // const checkRegistrationStatus = (startDate, endDate) => {
  //   const currentDate = new Date().getTime();
  //   const start = new Date(startDate).getTime();
  //   const end = new Date(endDate).getTime();
  //   console.log(currentDate >= start)
  //   console.log(start)
  //   console.log(currentDate <= end)
  //   const result = compareAsc(currentDate, start)
  //   console.log(result)

    // if (currentDate >= start && currentDate <= end) {
    //   return "Ongoing";
    // } else {
    //   return "Closed";
    // }
   
  // };


const checkRegistrationStatus = (startDate, endDate) => {
  const currentDate = new Date();
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  // Compare current date with start and end date
  const isAfterOrEqualStart = compareAsc(currentDate, start) >= 0; 
  const isBeforeOrEqualEnd = compareAsc(currentDate, end) <= 0; 
  
  if ( isAfterOrEqualStart &&  isBeforeOrEqualEnd) {
    return "Ongoing";
  } else {
    return "Closed";
  }

  // return isAfterOrEqualStart && isBeforeOrEqualEnd ? "closed" : "Ongoing";
};
  return (
    <div className="card rounded-sm bg-gradient-to-r from-[#caf2fa] via-[#caf0f8] to-[#c1f5e7] text-[#1d2d44] ">
      <div className="card-body">
        <h2 className="card-title">{sessionTitle}</h2>
        <p>{sessionDescription}</p>
        <div className="card-actions ">
        <button className="px-6 py-3 rounded-md bg-gradient-to-r from-[#2ec4b6] to-[#6feccb] text-black">
            {checkRegistrationStatus(registrationStartDate, registrationEndDate)}
          </button>
          <Link to={`/studySessions/${_id} `}><button className="btn rounded-md ">Read More</button> </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
