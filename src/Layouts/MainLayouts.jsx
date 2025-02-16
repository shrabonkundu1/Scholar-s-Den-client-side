import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;