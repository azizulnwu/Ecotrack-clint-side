import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const HeroSection = () => {
  const axiosInstance = useAxios();
  const {
    data: challengeData = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["challengeData"],
    queryFn: async () => {
      const result = await axiosInstance.get("/challengeData");
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

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
    <div className="max-w-[70%] mx-auto mb-8 ">
      <Carousel
        showArrows={true}
        showThumbs={false}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
      >
        {challengeData.map((data) => {
          refetch();
          return (
            <div className="py-4">
              <img src={data.image} className="w-60 h-100" />
              <p className="legend font-bold text-2xl">
                Title : {data.title}
                <span className="ml-2">Category : {data.category}</span>
              </p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroSection;
