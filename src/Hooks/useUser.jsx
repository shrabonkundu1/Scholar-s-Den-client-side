import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {

    const { user } = useAuth(); 
    console.log(user?.email)
    const axiosSecure = useAxiosSecure();
    const { data: userData, isPending, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data; 
        },
        enabled: !!user?.email 
    });

    return { userData, isPending, refetch };
};

export default useUser;