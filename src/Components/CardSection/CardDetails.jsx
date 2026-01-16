import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import BrandLogo from "../Shared/BrandLogo";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const CardDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const {
    data: cardDetails = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cardDetails", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/challengeData/${id}`);
      // console.log(result.data);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  const {
    _id,
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

  const userChallengeHandler = async () => {
    const { email } = user;

    const res = await axiosInstance.get(
      `/userChallengeDuplicateFind?category=${category}&email=${email}`
    );
    if (res.data) {
     toast("Challenge Already Accept.Please back to home");
      return;
    }

    const userChallengesInfo = {
      userEmail: email,
      category,
      challengeId: _id,
      title,
      description,
      image,
      progress: 0,
      status: "Not Started",
    };

    axiosSecure.post("/userChallenges", userChallengesInfo).then((res) => {
      if (res.data.insertedId) {
        console.log({ message: "Challenge is accept" });
      }

      axiosInstance.patch(`/challenges/category?category=${category}`);
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Challenge Accept Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <div className="max-w-[80%] mx-auto p-4 ">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div className="bg-slate-300">
        <div
          className="card card-side flex flex-col md:flex-row justify-center  shadow-sm mt-20 p-8
     "
        >
          <figure className="object-fill">
            <img src={image} alt="Movie" className="" />
          </figure>
          <div className="card-body bg-base-100 space-y-1">
            <h2 className="card-title mt-2">Title : {title}</h2>
            <p>
              <span className="font-bold text-[15px]">Category</span> :{" "}
              {category}
            </p>
            <p>
              <span className="font-bold text-[15px]">Description</span> :{" "}
              {description}
            </p>
            <p>
              <span className="font-bold text-[15px]">Duration</span> :{" "}
              {duration}
            </p>
            <p>
              <span className="font-bold text-[15px]">Target</span> : {target}
            </p>
            <p>
              <span className="font-bold text-[15px]">participants</span> :{" "}
              {participants}
            </p>
            <p>
              <span className="font-bold text-[15px]">ImpactMetric</span> :{" "}
              {impactMetric}
            </p>
            <div className="card-actions justify-center my-4">
              <p className="badge badge-outline font-bold">
                Start Date : {startDate}
              </p>
              <p className="badge badge-outline font-bold">
                End Date : {endDate}
              </p>
            </div>

            <div className="card-actions justify-end">
              <button
                onClick={userChallengeHandler}
                className="btn btn-primary hover:bg-blue-600 "
              >
                Join Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CardDetails;
