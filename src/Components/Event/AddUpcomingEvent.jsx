import React from "react";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import BrandLogo from "../Shared/BrandLogo";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AddUpcomingEvent = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const axiosSecure =useAxiosSecure()
  // if(loading)return <Loading></Loading>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      title,
      description,
      location,

      maxParticipants,
      currentParticipants,
    } = data;

    try {
      const eventsInfo = {
        title,
        description,
        location,
        organizer: user.email.toLowerCase(),
        maxParticipants,
        currentParticipants,

        date: new Date(),
      };

      axiosSecure.post("/events", eventsInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "Events Upload Successful" });
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Events Added",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (err) {
      // console.log(err);
      toast.error(err?.message);
    }
    reset();
  };
  return (
    <div className="md:max-w-[80%] mx-auto">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>

      <div className="hero bg-base-200 min-h-screen p-4 mt-2">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <h1 className="text-center font-bold text-2xl bg-sky-100 p-3 rounded-tr-lg rounded-tl-lg">
           Please Add Upcoming Event
          </h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                {/* Title field */}
                <label className="label">Title</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Title"
                  {...register("title", {
                    required: true,
                    maxLength: {
                      value: 50,
                      message: "Title must be at least 5 characters",
                    },
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}

                {/* Description field */}
                <label className="label">Description</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Description"
                  {...register("description", {
                    required: true,
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters",
                    },
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}

                {/* Location field */}
                <label className="label">Location</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Location"
                  {...register("location", {
                    required: true,
                    maxLength: {
                      value: 50,
                      message: "Location must be at least 5 characters",
                    },
                  })}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}

                {/* Max Participants field */}
                <label className="label">Max Participants</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Max Participants"
                  {...register("maxParticipants", {
                    required: true,
                  })}
                />
                {errors.maxParticipants && (
                  <p className="text-red-500 text-sm">
                    {errors.maxParticipants.message}
                  </p>
                )}
                {/* Current Participants field */}
                <label className="label">Current Participants</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Current Participants"
                  {...register("currentParticipants", {
                    required: true,
                  })}
                />
                {errors.currentParticipants && (
                  <p className="text-red-500 text-sm">
                    {errors.currentParticipants.message}
                  </p>
                )}

                <button className="btn btn-neutral mt-4 p-2">SUBMIT</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddUpcomingEvent;
