
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic"; 
const BookedSessionDetails = () => {
  const {id}=   useParams();
  
  console.log('id',id)
  const [session, setSession] = useState(null);
  const axiosPublic = useAxiosPublic(); 
    console.log(session)
  useEffect(() => {
    axiosPublic
      .get(`/studySessions/${id}`)
      .then((res) => setSession(res.data))
      .catch((error) => console.error("Error fetching session details:", error));
  }, [id, axiosPublic]); 

  if (!session) return <p className="text-gray-500 py-24">Loading...</p>;

  return (
    <div className="p-6 my-24">
      <h2 className="text-2xl font-semibold mb-2">{session.title}</h2>
      <p className="text-gray-600">Tutor: {session.tutorName}</p>
      <p className="text-gray-600">SessionDuration: {session.SessionDuration}</p>
      <p className="mt-4">{session.description}</p>
      <h2 className="py-16">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, exercitationem?</h2>
    </div>
  );
};

export default BookedSessionDetails;
