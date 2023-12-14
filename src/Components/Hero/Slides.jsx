
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Img1 from '../../assets/images/hero-img.png'
import Img2 from '../../assets/homeSliderImg/slide-1.png'
import Img3 from '../../assets/homeSliderImg/slide-2.jpg'
import Img4 from '../../assets/homeSliderImg/slide-3.png'


const Slides = () => {
  const data = [
    { image: "https://source.unsplash.com/1024x768/?nature" },
    { image: "https://source.unsplash.com/1024x768/?water" },
    { image: Img3 },
    { image: Img4 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {data.map(( value, index) => 
        (
         
            <div className="" key={index}>
              <img src={value.image} alt="" className="h-[350px] cursor-pointer" />
            </div>
        
        ))}
      </Slider>
    </div>
  );
};

export default Slides;
