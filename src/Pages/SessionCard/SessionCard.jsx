import React from "react";
import { Link } from "react-router-dom";

const SessionCard = ({ session }) => {
  console.log(session);

  //  

  const {
    sessionTitle,
    sessionDescription,
    registrationStartDate,
    registrationEndDate,
    _id
  } = session;

  // cheak date status:
  const checkRegistrationStatus = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    

    if (currentDate >= start && currentDate <= end) {
      return "Ongoing";
    } else {
      return "Closed";
    }
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
