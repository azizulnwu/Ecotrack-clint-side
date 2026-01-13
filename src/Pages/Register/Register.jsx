import { Link, useNavigate } from "react-router";
import BrandLogo from "../../Components/Shared/BrandLogo";

import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { useForm } from "react-hook-form";
import ImageUpload from "../../Utility/ImageUpload";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { AuthContext } from "../../Provider/AuthContext";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import useAxios from "../../Hook/useAxios";

const Register = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const {
    user,
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();
  console.log(user);
  const { displayName, email, photoUrl } = user || {};

  // if(loading)return <Loading></Loading>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      createUser(email, password).then(() => {
        ImageUpload(imageFile).then((data) => {
          console.log(data);
          const userInfo = {
            displayName: name,
            email: email.toLowerCase(),
            photoUrl: data,
          };

          axiosInstance.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log({ message: "user is created" });
            }
          });

          updateUserProfile(name, data?.data?.display_url);
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate("/");
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const SignInWithGoogle = () => {
    signInWithGoogle().then(() => {
      const userInfo = {
        displayName: displayName,
        email: email.toLowerCase(),
        photoUrl: photoUrl,
        provider: "google",
      };
      axiosInstance.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log({ message: "user is created" });
        }
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>

      <div className="hero bg-base-200 min-h-screen mt-2">
        <div className="card bg-base-100  w-[50%] shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                {/* Name field */}
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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

                {/* Email field */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* Password field */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  {...register("password", {
                    required: true,

                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                      message:
                        "Password must be at least 6 characters and include uppercase, lowercase, and special character",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                <button className="btn btn-neutral mt-4 p-2">
                  {loading ? <LoadingSpinner></LoadingSpinner> : "SUBMIT"}
                </button>
              </fieldset>
            </form>
            <button
              onClick={SignInWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            <Link to="/login" className="text-center">
              If you Already Registered pls.{" "}
              <span className="text-xl font-bold text-green-400 underline mr-0.5">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
