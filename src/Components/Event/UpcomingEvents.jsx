import React from 'react';
import useAxios from '../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const UpcomingEvents = () => {

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const { data: AllEvents = [], isLoading } = useQuery({
    queryKey: ["AllEvents"],
    queryFn: async () => {
      const result = await axiosSecure.get("/events/all");
      // console.log(result.data);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
   <div className="w-full md:max-w-[90%] mx-auto rounded-box">
    <h1 className="text-center font-bold text-2xl bg-sky-200 p-4 rounded-tr-lg rounded-tl-lg">
     Up Coming Events 
    </h1>
    <div className="bg-red-300 w-full h-1"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-300 p-0.5 md:p-4 rounded-br-lg rounded-bl-lg">
      
      {AllEvents.map((data) => {
        return (
          <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                <span className="font-bold text-[15px]">Title</span> :{" "}
                {data.title}
              </h2>
              <p>
                <span className="font-bold text-[15px]">Description</span> :{" "}
                {data.description}
              </p>
              <p>
                <span className="font-bold text-[15px]">Location</span> :{" "}
                {data.location}
              </p>

              <p>
                <span className="font-bold text-[15px]">Organizer</span> :{" "}
                {data.organizer}
              </p>
              <div className="card-actions justify-center my-4">
                <p className="badge badge-outline font-bold">
                  <span className="font-bold text-[15px]">Max Participants</span> :{" "}
                  {data.maxParticipants}
                </p>

                <p className="badge badge-outline font-bold">
                  <span className="font-bold text-[15px]">Current Participants</span> :{" "}
                  {data.currentParticipants}
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

export default UpcomingEvents;