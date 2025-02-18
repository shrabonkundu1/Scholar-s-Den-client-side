import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import TutorCards from './TutorCards';
import Marquee from 'react-fast-marquee';

const OurTutors = () => {
    const axiosPublic = useAxiosPublic();
    const [tutors,setTutors] = useState([]);
    useEffect(() => {
        axiosPublic.get('/tutors')
        .then(res => {
            setTutors(res.data)
        })
    },[])
    return (
        <div>
            <h2 className='text-5xl font-semibold text-center font-Cinzel'>Our Tutuors</h2>

            <div className='my-16 '>
               <Marquee className='mr-8'>
               {
                    tutors.map(tutor => <TutorCards key={tutor._id} tutor={tutor}></TutorCards>)
                }
               </Marquee>
            </div>
        </div>
    );
};

export default OurTutors;