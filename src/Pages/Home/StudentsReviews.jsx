import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const StudentsReviews = () => {
    const axiosPublic =useAxiosPublic()
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
      axiosPublic.get("/testimonials").then((res) => {
        setReviews(res.data);
      });
    }, []);
    return (
      <section>
        <div className="text-center my-16 ">
        <p className="text-3xl md:text-4xl font-Cinzel font-semibold">What Our Student Say</p>
        </div>
  
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="md:mx-36 mx-10 flex flex-col items-center text-center  ">
              <Rating className="mb-10" style={{ maxWidth: 180 }} value={review.rating} readOnly />
              <FaQuoteLeft className=" size-32"/>
              <h2 className="text-xl font-medium mt-5">{review.heading}</h2>
                <p className="md:py-8 md:w-2/3  py-4">{review.details}</p>
                <h2 className="md:text-3xl text-2xl  font-semibold">{review.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  };

export default StudentsReviews;