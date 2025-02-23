
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { compareAsc, parseISO } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

const SessionCard = ({ session }) => {
  // const {loading} = useAuth()
  const {
    sessionTitle,
    sessionDescription,
    registrationStartDate,
    registrationEndDate,
    _id
  } = session;

  useEffect(() => {
    AOS.init({
      duration: 1500, 
      easing: "ease-out-quart", 
      // easing: "ease-in-out"
    });
  }, []);
  

  const checkRegistrationStatus = (startDate, endDate) => {
    const currentDate = new Date();
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const isAfterOrEqualStart = compareAsc(currentDate, start) >= 0;
    const isBeforeOrEqualEnd = compareAsc(currentDate, end) <= 0;

    return isAfterOrEqualStart && isBeforeOrEqualEnd ? "Ongoing" : "Closed";
  };

  return (
    <div
      className="card rounded-sm bg-gradient-to-r from-[#caf2fa] via-[#caf0f8] to-[#c1f5e7] text-[#1d2d44] transition-transform duration-300 ease-in-out hover:scale-110"
      data-aos="fade-up"
    >
      <div className="card-body">
        <h2 className="card-title">{sessionTitle}</h2>
        <p>{sessionDescription}</p>
        <div className="card-actions">
          <button className="px-6 py-3 rounded-md bg-gradient-to-r from-[#2ec4b6] to-[#6feccb] text-black">
            {checkRegistrationStatus(registrationStartDate, registrationEndDate)}
          </button>
          <Link to={`/studySessions/${_id}`}>
            <button className="btn rounded-md">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
