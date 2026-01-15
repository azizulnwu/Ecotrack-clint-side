import React from "react";
import { Link, useNavigate } from "react-router";
import useAxios from "../../Hook/useAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LoadingSpinner from "../Shared/LoadingSpinner";
import BrandLogo from "../Shared/BrandLogo";
import ImageUpload from "../../Utility/ImageUpload";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AddChallenges = () => {
  // const navigate = useNavigate();
  const axiosInstance = useAxios();
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
      name,
      image,
      title,
      email,
      target,
      duration,
      impactMetric,
      startDate,
      endDate,
      category,
      description,
    } = data;
    const imageFile = image[0];

    try {
      const challengesInfo = {
        name,
        title,
        email:email.toLowerCase(),
        target,
        duration,
        impactMetric,
        startDate,
        endDate,
        category,
        description
      };

      axiosSecure.post("/challenges", challengesInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "Challenges Upload Successful" });
        }
        ImageUpload(imageFile).then((data) => {
          const image = data;
          const challengesInfo = {
            category,
            image,
          };

          axiosInstance.patch("/challenges/image", challengesInfo).then(() => {
            if (res.data.insertedId) {
              console.log({ message: "Challenges Upload Successful" });
            }
          });
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Challenges Upload Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (err) {
      console.log(err);
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
           Please Add Challenge
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

                {/* Category field */}

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Category</legend>
                  <select
                    defaultValue="Waste Reduction"
                    className="select w-full"
                    {...register("category", {
                      required: true,
                    })}
                  >
                    <option>Waste Reduction</option>
                    <option>Energy Conservation</option>
                    <option>Water Conservation</option>
                    <option>Sustainable Transport</option>
                    <option>Green Living</option>
                    <option>Sustainable Agriculture</option>
                  </select>
                </fieldset>

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

                {/* Duration field */}
                <label className="label">Duration</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Duration time hrs"
                  {...register("duration", {
                    required: true,
                  })}
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm">
                    {errors.duration.message}
                  </p>
                )}

                {/* Target field */}
                <label className="label">Target</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Target Description"
                  {...register("target", {
                    required: true,
                    maxLength: {
                      value: 100,
                      message: "target must be at least 5 characters",
                    },
                  })}
                />
                {errors.target && (
                  <p className="text-red-500 text-sm">
                    {errors.target.message}
                  </p>
                )}

                {/* ImpactMetric field */}
                <label className="label">ImpactMetric</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="ImpactMetric description"
                  {...register("impactMetric", {
                    required: true,
                  })}
                />
                {errors.impactMetric && (
                  <p className="text-red-500 text-sm">
                    {errors.impactMetric.message}
                  </p>
                )}

                {/* Email field */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* Start date field*/}
                <label className="label">Start Date</label>
                <input
                  type="date"
                  className="input w-full"
                  placeholder="Start Date"
                  {...register("startDate", {
                    required: true,
                  })}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
                {/* End date field*/}
                <label className="label">End Date</label>
                <input
                  type="date"
                  className="input w-full"
                  placeholder="End Date"
                  {...register("endDate", {
                    required: true,
                  })}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </p>
                )}

                {/* image field */}
                <label className="label">Upload Image</label>
                <input
                  type="file"
                  className="file-input w-full"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}

                <button className="btn btn-neutral mt-4 p-2">SUBMIT</button>
                {/* <button className="btn btn-neutral mt-4 p-2">
                  {loading ? <LoadingSpinner></LoadingSpinner> : "SUBMIT"}
                </button> */}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChallenges;
