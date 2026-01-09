import React from "react";
import { Link, useParams } from "react-router";
import BrandLogo from "../Shared/BrandLogo";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";

const CardDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosInstance = useAxios();
  const {
    data: cardDetails = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cardDetails", id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/challengeData/${id}`);
      console.log(result.data);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  const {
    image,
    title,
    description,
    startDate,
    endDate,
    impactMetric,
    target,
    duration,
    category,

    participants,
  } = cardDetails;

  return (
    <div className="max-w-[80%] mx-auto p-4 ">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div className="bg-slate-300">
        <div
          className="card card-side flex justify-center  shadow-sm mt-20 p-8
     "
        >
          <figure className="object-fill">
            <img src={image} alt="Movie" className=""/>
          </figure>
          <div className="card-body bg-base-100 space-y-1">
            <h2 className="card-title mt-2">Title : {title}</h2>
            <p><span className="font-bold text-[15px]">Category</span> : {category}</p>
            <p><span className="font-bold text-[15px]">Description</span> : {description}</p>
            <p><span className="font-bold text-[15px]">Duration</span> : {duration}</p>
            <p><span className="font-bold text-[15px]">Target</span> : {target}</p>
            <p><span className="font-bold text-[15px]">participants</span> : {participants}</p>
            <p><span className="font-bold text-[15px]">ImpactMetric</span> : { impactMetric}</p>
             <div className="card-actions justify-center my-4">
                <p className="badge badge-outline font-bold">
                  Start Date : {startDate}
                </p>
                <p className="badge badge-outline font-bold">
                  End Date : {endDate}
                </p>
              </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Join Challenge</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
