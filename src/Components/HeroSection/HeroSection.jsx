import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

const HeroSection = () => {
  const onChange = (index) => {
    console.log("Slide changed:", index);
  };

  const onClickItem = (index) => {
    console.log("Slide clicked:", index);
  };

  const onClickThumb = (index) => {
    console.log("Thumbnail clicked:", index);
  };
  return (
    <div className="max-w-[90%] mx-auto mb-8">
      <Carousel
        showArrows={true}
        showThumbs={false} 
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
      >
        <div>
          <img
            src="https://i.ibb.co/PZSrdh8G/download-7.jpg"
            className="w-[200px] h-[400px]"
          />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co/PZSrdh8G/download-7.jpg"
            className="w-[200px] h-[400px]"
          />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co/PZSrdh8G/download-7.jpg"
            className="w-[200px] h-[400px]"
          />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co/PZSrdh8G/download-7.jpg"
            className="w-[200px] h-[400px]"
          />
          <p className="legend">Legend 1</p>
        </div>
        
      </Carousel>
    </div>
  );
};

export default HeroSection;
