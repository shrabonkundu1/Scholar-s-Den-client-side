import React, { useEffect } from 'react';
import useUser from '../../../Hooks/useUser';
import { useNavigate } from 'react-router-dom';

const DashboardRedirect = () => {
    const { userData, isPending } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isPending && userData?.role) {
            if (userData.role === "admin") {
                navigate("/dashboard/adminHome");
            } else if (userData.role === "tutor") {
                navigate("/dashboard/tutorHome");
            } else {
                navigate("/dashboard/userHome");
            }
        }
    }, [userData, isPending, navigate]);

    if (isPending) {
        return <p>Loading...</p>;
    }

    return null;
};


export default DashboardRedirect;