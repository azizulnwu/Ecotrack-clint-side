import React from "react";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
const Tips = () => {
  const axiosInstance = useAxios();
  const { data: AllTips = [], isLoading } = useQuery({
    queryKey: ["AllTips"],
    queryFn: async () => {
      const result = await axiosInstance.get("/tips/all");
      // console.log(result.data);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
   <div className="w-full md:max-w-[90%] mx-auto rounded-box mb-4">
    <h1 className="text-center font-bold text-2xl bg-sky-200 p-4 rounded-tr-lg rounded-tl-lg">
      All Tips Section
    </h1>
    <div className="bg-red-300 w-full h-1"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-300 p-0.5 md:p-4 rounded-br-lg rounded-bl-lg">
      
      {AllTips.map((data) => {
        return (
          <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                <span className="font-bold text-[15px]">Title</span> :{" "}
                {data.title}
              </h2>
              <p>
                <span className="font-bold text-[15px]">Author Name</span> :{" "}
                {data.authorName}
              </p>
              <p>
                <span className="font-bold text-[15px]">Category</span> :{" "}
                {data.category}
              </p>

              <p>
                <span className="font-bold text-[15px]">Content</span> :{" "}
                {data.content}
              </p>
              <div className="card-actions justify-center my-4">
                <p className="badge badge-outline font-bold">
                  <span className="font-bold text-[15px]">Upvotes</span> :{" "}
                  {data.upvotes}
                </p>

                <p className="badge badge-outline font-bold">
                  <span className="font-bold text-[15px]">CreateAt</span> :{" "}
                  {data.createdAt}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
   </div>
  );
};

export default Tips;
