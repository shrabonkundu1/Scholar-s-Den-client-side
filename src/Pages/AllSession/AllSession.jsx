import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SessionCard from '../SessionCard/SessionCard';

const AllSession = () => {

    const axiosPublic = useAxiosPublic();
    const [sessions,setSessions] = useState([]);
    useEffect(() => {
        axiosPublic.get('/allStudySessions')
        .then(res => {
            setSessions(res.data);
        })
    },[]);

    return (
        <div>
            <h2 className='text-5xl font-semibold text-center font-Cinzel'>Study Session</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-4/5 md:w-11/12 w-[95%] mx-auto my-16'>
                {
                    sessions.map(session => <SessionCard key={session._id} session={session}></SessionCard>)
                }
            </div>
        </div>
    );
};
export default AllSession;