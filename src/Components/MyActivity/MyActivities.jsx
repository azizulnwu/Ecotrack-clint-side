import React from "react";
import { Link } from "react-router";
import BrandLogo from "../Shared/BrandLogo";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxios from "../../Hook/useAxios";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const MyActivities = () => {
  const { user } = useAuth() || [];
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const { email } = user || [];

  const {
    data: MyActivities = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["MyActivities", user],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/userChallenges/find?email=${email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const ChallengeHandler = async (data, id) => {
    // console.log(data);
    const updateData = {
      status: data,
      userEmail: email,
      challengeId: id,
    };
    await axiosSecure
      .patch("/userChallenges/statusUpdated", updateData)
      .then(() => {
        toast("Challenge Start going on");
        refetch();
      });
  };

  const startChallengeHandler = (data, id) => {
    ChallengeHandler(data, id);
  };
  const finishedChallengeHandler = (data, id) => {
    ChallengeHandler(data, id);
  };

  const deleteChallengeHandler = async (id) => {
    const deleteChallengerData = {
      userEmail: email,
      challengeId: id,
    };
    // console.log(deleteChallengerData)
    await axiosSecure
      .post("/userChallenges/delete",deleteChallengerData)
      .then(() => {
        toast("Challenge Deleted");
        refetch();
      });
  };

  return (
    <div className=" md:max-w-[90%] mx-auto p-10 mt-8 bg-slate-50">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div className="mt-10">

  {/* ================= DESKTOP TABLE ================= */}
  <div className="hidden md:block overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr className="bg-slate-200">
          <th>Challenge Name</th>
          <th>Challenge Title</th>
          <th>Challenge Description</th>
          <th>Challenge ID</th>
          <th>Challenge Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {MyActivities.map((data) => (
          <tr key={data.challengeId} className="bg-slate-100">
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={data.image} alt="challenge" />
                  </div>
                </div>
                <div className="font-bold">{data.category}</div>
              </div>
            </td>

            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.challengeId}</td>
            <td>{data.status}</td>

            <td className="space-x-2">
              {data.status === "Not Started" && (
                <button
                  onClick={() =>
                    startChallengeHandler("Ongoing", data.challengeId)
                  }
                  className="btn bg-blue-300 hover:font-bold"
                >
                  Start
                </button>
              )}

              {data.status === "Ongoing" && (
                <button
                  onClick={() =>
                    finishedChallengeHandler("Finished", data.challengeId)
                  }
                  className="btn bg-blue-300 hover:font-bold"
                >
                  Finish
                </button>
              )}

              <button
                onClick={() => deleteChallengeHandler(data.challengeId)}
                className="btn bg-red-500 font-bold hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ================= MOBILE VIEW ================= */}
  <div className="md:hidden space-y-4">
    {MyActivities.map((data) => (
      <div
        key={data.challengeId}
        className="border rounded-lg p-4 bg-slate-100 space-y-2"
      >
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            className="w-12 h-12 rounded"
            alt="challenge"
          />
          <div>
            <p className="font-bold">{data.category}</p>
            <p className="text-sm text-gray-500">{data.title}</p>
          </div>
        </div>

        <p><span className="font-semibold">Description:</span> {data.description}</p>
        <p><span className="font-semibold">Challenge ID:</span> {data.challengeId}</p>
        <p><span className="font-semibold">Status:</span> {data.status}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {data.status === "Not Started" && (
            <button
              onClick={() =>
                startChallengeHandler("Ongoing", data.challengeId)
              }
              className="btn bg-blue-300"
            >
              Start
            </button>
          )}

          {data.status === "Ongoing" && (
            <button
              onClick={() =>
                finishedChallengeHandler("Finished", data.challengeId)
              }
              className="btn bg-blue-300"
            >
              Finish
            </button>
          )}

          <button
            onClick={() => deleteChallengeHandler(data.challengeId)}
            className="btn bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

</div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyActivities;



