import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useTutor = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isTutor, isPending: isTutorLoading } = useQuery({
        queryKey: [user?.email, 'isTutor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tutor/${user.email}`);
            return res.data.tutor; 
        }
    });

    return [isTutor, isTutorLoading];
};

export default useTutor;