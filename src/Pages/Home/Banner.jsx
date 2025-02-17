import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slider1 from '../../assets/banner-image/pexels-fauxels-3183150.jpg'
const Banner = () => {
    return (
        <Carousel autoPlay>
                <div>
                    <img className="max-h-[650px] " src={slider1} />
                </div>
                <div>
                    <img className="max-h-[650px] object-cover" src="https://www.avanse.com/blogs/images/Planning-to-study-abroad.jpg" />
                </div>
                <div>
                    <img className="max-h-[650px] object-cover" src="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?cs=srgb&dl=pexels-pixabay-301920.jpg&fm=jpg" />
                </div>
                <div className=''>
                    <img className="max-h-[650px] " src="https://riseuplabs.com/wp-content/uploads/2022/11/elearning-platform-for-european-students-banner-image.webp" />
                </div>
              
            </Carousel>
    );
};

export default Banner;