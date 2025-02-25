import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import StudySession from './StudySession';
import OurTutors from './OurTutors';
import ContactUs from './ContactUs';
import StudentsReviews from './StudentsReviews';

const Home = () => {
    return (
        <div>
            <div>
                <Helmet>
                    <title>Scholar's Den | Home</title>
                </Helmet>
            </div>
            <div>
                <Banner></Banner>
            </div>
            <div className='my-24'>
                <StudySession></StudySession>
            </div>
            <div className='my-24'>
                <OurTutors></OurTutors>
            </div>
            
            <div className='my-24'>
                <StudentsReviews></StudentsReviews>
            </div>
            <div className='my-24'>
                <ContactUs></ContactUs>
            </div>
            
        </div>
    );
};

export default Home;