import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import SocialLogin from './SocialLogin';

const Register = () => {
    const navigate  = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const {createUser,updateUserProfile} = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      
    
      const onSubmit = async(data) => {
        try {
          console.log(data);
          const result = await createUser(data.email, data.password);
          const user = result.user;
          console.log(user);
          updateUserProfile(data.name,data.photoUrl)
          .then(() => {
            console.log('user Profile info updated')
            // user data post database:
            const userInfo = {
              name : data.name,
              email: data.email,
              role : data.role,
              image : data.photoUrl
            }
            axiosPublic.post('/users',userInfo)
            .then(res => {
              console.log(res.data)
              if(res.data.insertedId){
                console.log('user added to the database successfully')
                reset();
                Swal.fire({
                        title: "User created Successfully!",
                        icon: "success",
                        draggable: true
                      });
                      navigate('/')
              }
            })
          })
          .catch(error => console.log(error))
      } catch (error) {
          console.error("Error creating user:", error);
      }
      };


    return (
        <div>
            <Helmet>
        <title>Scholar's Den | Register</title>
      </Helmet>

      <div className="hero bg-gradient-to-r from-[#a8e6f4] via-[#d4f0f5] to-blue-100 min-h-screen py-24">
        <div className="hero-content flex-col flex md:flex-row md:w-8/12 mx-auto">
          <div className="text-center lg:text-left">
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
          </div>
          <div className="card  bg-gradient-to-r from-[#2ec4b5bb] to-[#6feccb]  w-full max-w-md shrink-0 shadow-2xl">
            <h1 className="text-4xl pt-10 font-bold p-5 text-center font-Cinzel">
              Register now!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-600 p-1">Name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoUrl", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoUrl && <span className="text-red-600 p-1">Photo URL is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-600 p-1">Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                 type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 16,
                    pattern: /^(?=.*[!@#\$%\^\&*_=+-])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#\$%\^\&*_=+-]{6,16}$/
                  })}
                  placeholder="Enter password"
                  className="input input-bordered"
                />
                 <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute right-10 top-[460px]"
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
                
                {errors.password?.type === 'required' && <span className="text-red-600 p-1">Password is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-600 p-1">Password must be 6 character</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-600 p-1">Password must contain one special character</span>}
              </div>
              <div className="form-control">
                
                <label className="form-control w-full ">
            <div className="label">
              <span className="label-text ">Role</span>
            </div>
            <select
              {...register("role",{required:true})}
              defaultValue={"Select a Category"}
              className="select select-bordered w-full rounded-md"
            >
              <option disabled >
                Select a Role
              </option>
              <option value="admin">Admin</option>
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
            </select>
          </label>
                {errors.email && <span className="text-red-600 p-1">Email is required</span>}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-outline"
                  value="Register"
                />
              </div>
            </form>
            <p className="text-center p-5 pb-10">
              Already registered? Go to <Link className="text-blue-600 font-semibold" to="/login">Login</Link>
            </p>
            <div className='mx-auto w-[90%]'>
              <SocialLogin></SocialLogin>

            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Register;