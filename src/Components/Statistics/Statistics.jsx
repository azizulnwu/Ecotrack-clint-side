import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs';
import { FaDollarSign, FaUserAlt } from 'react-icons/fa';
import useAxios from '../../Hook/useAxios';
import { MdOutlineCo2 } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { LuTreePine } from "react-icons/lu";

const Statistics = () => {
 const axiosInstance = useAxios()
 const {
    data: AllUser = [],
  
   } = useQuery({
    queryKey: ["AllUser"],
    queryFn: async () => {
      const result = await axiosInstance.get("/user/all");
      
      return result.data;
    },
  });

  
  return (
    <div className='max-w-[90%] mx-auto bg-red-200 pt-8 pb-3 px-4 mb-4 p-6 '>
      <div className=''>
      <div className='my-20'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow'>
          {/* Sales Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              {/* <FaDollarSign className='w-6 h-6 text-white' /> */}
              <MdOutlineCo2 className='w-15 h-15 text-white'/>
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                CO2 Saved
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
              100 kg
              </h4>
            </div>
          </div>
          {/* Total Orders */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              {/* <BsFillCartPlusFill className='w-6 h-6 text-white' /> */}
              <IoTrashBinOutline className='w-6 h-6 text-white'/>
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
             Plastic Saved
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                400 kg
              </h4>
            </div>
          </div>
          {/* Total Plants */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
            
              <LuTreePine className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
              Tree Plantation
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
             100 pics
              </h4>
            </div>
          </div>
          {/* Users Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUserAlt className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total User
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {AllUser.length}
              </h4>
            </div>
          </div>
        </div>

        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/*Sales Bar Chart */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
            {/* Chart goes here.. */}
          </div>
          {/* Calender */}
          <div className=' relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
            {/* Calender */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Statistics;