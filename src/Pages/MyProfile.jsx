import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import BrandLogo from "../Components/Shared/BrandLogo";
import useAuth from "../Hook/useAuth";
import useAxios from "../Hook/useAxios";
import { toast, ToastContainer } from "react-toastify";

const MyProfile = () => {
  const { user, logOut, setLoading } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [currentUserProfile, setCurrentUserProfile] = useState();

  const LogoutUser = () => {
    logOut().then(() => {
      toast.success("Logout successfully");
      setLoading(false);
      navigate("/");
    });
  };
  console.log(user);
  useEffect(() => {
    if (!user?.email) return;

    axiosInstance.get(`/user?email=${user?.email}`).then((res) => {
      setCurrentUserProfile(res.data);
    });
  }, [user?.email, axiosInstance]);
  console.log(currentUserProfile);
  return (
    <div className="max-w-[70%] mx-auto p-10 ">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div className="card card-side shadow-sm mt-8 p-4 bg-base-300 flex items-end">
        <figure>
          <img
            src={
              currentUserProfile?.photoUrl
                ? currentUserProfile?.photoUrl
                : `https://i.ibb.co.com/GQqk9w6N/e035717e-a755-485a-86c7-c165a4f7bb80.jpg`
            }
            alt="logo"
            className="w-100 h-100 p-3"
          />
        </figure>
        <div className="space-y-3 ml-10">
          <h2 className="card-title">
            <span className="font-bold text-[15px]">Email </span>:{" "}
            {currentUserProfile?.email}
          </h2>
          <p>
            <span className="font-bold text-[15px]">Name </span>:{" "}
            {currentUserProfile?.displayName}
          </p>
          <p>
            <span className="font-bold text-[15px]">Roll </span>:{" "}
            {currentUserProfile?.roll}
          </p>
          <p>
            <span className="font-bold text-[15px]">ID </span>:{" "}
            {currentUserProfile?._id}
          </p>

          <p>
            <span className="font-bold text-[15px]">CreateAt </span>:{" "}
            {currentUserProfile?.createAt}
          </p>
          <div className="card-actions justify-end">
            <Link to="/myActivities" className="btn btn-primary mt-2">
              My Activity
            </Link>
            <button onClick={LogoutUser} className="btn btn-primary mt-2">
              Log Out
            </button>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyProfile;
