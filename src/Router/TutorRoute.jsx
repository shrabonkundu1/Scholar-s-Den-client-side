import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useTutor from '../Hooks/useTutor';
import useAuth from '../Hooks/useAuth';

const TutorRoute = ({children}) => {
    const {user,loading} = useAuth();
    const [isTutor,isTutorLoading] = useTutor()
    const location = useLocation();

    if(loading || isTutorLoading) {
        return  <span className="loading loading-bars loading-lg"></span>
    }

    if(user && isTutor) {
        return children;
    }
    return <Navigate to={'/login'} state={{from : location}} replace></Navigate>
};

export default TutorRoute;