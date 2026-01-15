import React from "react";
import useAxios from "../../Hook/useAxios";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import BrandLogo from "../Shared/BrandLogo";
import useAxiosSecure from "../../Hook/useAxiosSecure";
const TipsAdd = () => {
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
    const { title, upvotes, category, content } = data;

    try {
      const tipsInfo = {
        authorName: user?.displayName,
        title,
        author: user?.email.toLowerCase(),
        upvotes,
        category,
        content,
        createdAt: new Date(),
      };

      axiosSecure.post("/tips", tipsInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "Tips Upload Successful" });
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tips Added",
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
           Please Add Tips
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

                {/* content field */}
                <label className="label">Content</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Content"
                  {...register("content", {
                    required: true,
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters",
                    },
                  })}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">
                    {errors.content.message}
                  </p>
                )}

                {/* upvotes field */}
                <label className="label">Upvotes</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Upvotes"
                  {...register("upvotes", {
                    required: true,
                  })}
                />
                {errors.upvotes && (
                  <p className="text-red-500 text-sm">
                    {errors.upvotes.message}
                  </p>
                )}

                <button className="btn btn-neutral mt-4 p-2">SUBMIT</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsAdd;
