import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const AllUsers = () => {
    const axiosSecure  = useAxiosSecure();
    const [users,setUsers] = useState(null);
    console.log(users)
    useEffect(() => {
        axiosSecure.get('/users')
        .then(res => {
            setUsers(res.data)
        })
    },[])
    return (
        <div>
            ALl User : {users.length}
        </div>
    );
};

export default AllUsers;