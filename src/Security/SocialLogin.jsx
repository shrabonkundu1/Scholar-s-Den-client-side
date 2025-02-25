import React from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            const userInfo = {
                name : result.user?.displayName,
                email : result.user?.email,
                role:"student"
            };
            axiosPublic.post('/users', userInfo) 
            .then(res => {
                navigate(from, {replace: true})
            })

        })
    };

    const handleGithubSignIn = (e) => {

    }
    return (
        <div>
            <div className="divider my-0">Or</div>
            <div className='w-full space-y-2 mx-auto pb-10 py-6'>
                <button onClick={handleGoogleSignIn} className='btn px-8 btn-outline w-full'> Sign In Google</button>
                <button onClick={handleGithubSignIn} className='btn px-8 btn-outline w-full'> Sign In Github</button>
            </div>
        </div>
    );
};

export default SocialLogin;