import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import StudySession from './StudySession';

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
            Home
        </div>
    );
};

export default Home;