


import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginLottie from '../lottie/Login.json';
import Lottie from 'react-lottie';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from './SocialLogin';

const Login = () => {

  const {signInUser} = useAuth() ;
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    try {
      const result = await signInUser(email, password); 
      const user = result.user;
      Swal.fire({
        title: "Login Successfully!",
        icon: "success",
        draggable: true
      });
      navigate(from, {replace: true})
      console.log(user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };


  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }; 

  const options = {
    loop: true,
    autoplay: true, 
    animationData: loginLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  

  return (
    <>
      <Helmet>
        <title>Master Cafe | Login</title>
      </Helmet>
      <div className="hero py-24 bg-gradient-to-r from-[#a8e6f4] via-[#d4f0f5] to-blue-100 min-h-screen">
        <div className="hero-content flex-col flex md:flex-row md:w-8/12 mx-auto">
          <div className="text-center lg:text-left">
            <Lottie options={options} className="w-[800px] h-[1000px]" />
          </div>
          <div className="card bg-gradient-to-r from-[#2ec4b5bb] to-[#6feccb]  w-full  max-w-md shrink-0 shadow-2xl">
            <h1 className="text-4xl pt-10 font-bold p-5 text-center font-Cinzel">
              Login now!
            </h1>
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                 type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className="input input-bordered"
                />
                 <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute right-10 top-[275px]"
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control bg-transparent">
                <label className="label bg-transparent">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                    onBlur={handleValidateCaptcha}
                  placeholder="Enter the text"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-outline"
                    disabled={disabled}
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center p-5 pb-10">
              New here? Please{' '}
              <Link className="text-blue-600 font-semibold" to={'/register'}>
                Register
              </Link>
            </p>
            <div className="mx-auto w-[90%]">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;