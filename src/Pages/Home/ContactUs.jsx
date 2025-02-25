

import React, { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../lottie/autoV.json"; 
import useAuth from "../../Hooks/useAuth";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
    const {user} = useAuth();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    AOS.init({
      duration: 1500, 
      easing: "ease-out-quart", 
      // easing: "ease-in-out"
    });
  }, []);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold font-Cinzel  text-center pt-16 md:my-10"data-aos="fade-up">
        Have You are Interested?
      </h2>
      <div className="md:w-[85%] py-16 mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full " data-aos="fade-right">
          <h2 className="text-center mb-10 text-3xl font-semibold">
            Contact Us
          </h2>
          <div className="  w-[90%] mx-auto shrink-0 ">
            <form className="">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Name*</span>
                  </label>
                  <input
                    type="name"
                    placeholder=""
                    defaultValue={user?.displayName}
                    className="input w-full input-bordered shadow-md"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Email*</span>
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    placeholder="email"
                    className="input input-bordered shadow-md"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Phone*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your phone nunber -"
                  className="input input-bordered shadow-md"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Message*</span>
                </label>
                <textarea
                  placeholder="Write Your Message Here -"
                  className="textarea textarea-bordered textarea-lg w-full bg-base-100 shadow-md"
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-300 w-2/3 mx-auto">Send Message </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[90%] md:w-5/6  flex justify-center " data-aos="fade-left">
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
