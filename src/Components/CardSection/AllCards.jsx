import React from "react";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link, NavLink } from "react-router";

const AllCards = () => {
  const axiosInstance = useAxios();
  const {
    data: AllCards = [],
   isLoading,
   } = useQuery({
    queryKey: ["AllCards"],
    queryFn: async () => {
      const result = await axiosInstance.get("/challengeData");
      console.log(result.data)
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-[90%] mx-auto grid grid-cols-3 gap-2 bg-slate-300 p-2 rounded-box">
      {AllCards.map((data) => {
        return (
          <NavLink
            to={`/cardDetails/${data._id}`}
            className="card bg-base-100  shadow-sm flex p-2 "
          >
            <figure className="flex-1">
              <img src={data.image} alt="Shoes" />
            </figure>
            <div className="mt-4 p-2">
              <h2 className="card-title mb-2">
                {data.title}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p className="space-y-2">{data.description}</p>

              <div className="card-actions justify-center my-4">
                <p className="badge badge-outline font-bold">
                  Duration : {data.duration}
                </p>
                <p className="badge badge-outline font-bold">
                  No of Participants : {data.participants}
                </p>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default AllCards;
