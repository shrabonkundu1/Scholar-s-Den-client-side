import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';

const SessionDetails = () => {
    const axiosPublic = useAxiosPublic();
    const [sessions,setSessions] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axiosPublic.get(`/studySessions/${id}`)
        .then(res => {
            setSessions(res.data)
        })
    },[])
    const {sessionTitle,tutorName,averageRating,sessionDescription,registrationStartDate,classEndDate,classStartTime,registrationEndDate,reviews,registrationFee,sessionDuration,status} = sessions;
    return (
        <div>
            details
        </div>
    );
};

export default SessionDetails;