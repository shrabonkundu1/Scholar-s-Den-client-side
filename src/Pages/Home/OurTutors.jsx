import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import TutorCards from './TutorCards';
import Marquee from 'react-fast-marquee';
import { useQuery } from '@tanstack/react-query';

const OurTutors = () => {
    const axiosPublic = useAxiosPublic();
  

    const { data: tutors = [] } = useQuery({
        queryKey: ["tutors"], 
        queryFn: async () => {
          const res = await axiosPublic.get('/tutors');
          return res.data;
        },
      });
      
    
    
    return (
        <div>
            <h2 className='md:text-5xl text-3xl font-semibold text-center font-Cinzel'>Our Tutuors</h2>

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