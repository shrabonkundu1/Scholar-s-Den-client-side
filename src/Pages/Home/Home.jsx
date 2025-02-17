import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';

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
            Home
        </div>
    );
};

export default Home;