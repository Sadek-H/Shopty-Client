import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import lottielogin from "./Lottiefile/Login.json";
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn ,resetPassword, signInWithGoogle } = useContext(AuthContext);
  const [mail, setEmail] = useState("");
  
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.Email.value;
    const password = form.Password.value;
    signIn(email, password).then((res) => {
      if (res.user) {
        console.log(res.user);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    });
  };
 
  const handleresetPassword = ()=>{
          resetPassword(mail).then(() => {
            toast.success("Password reset email sent");
          }).catch((error) => {
            toast.error("Error sending password reset email", error);
          });
         document.getElementById("my_modal_3").close();
  }

  const handlegoogle = ()=>{
            signInWithGoogle()
        .then((res)=>{
          axios.post("https://shopty-server.onrender.com/register", {
            email: res.user.email,
            name: res.user.displayName,
            photo: res.user.photoURL,
          })
          .then((res) => {
            if (res.data.success) {
              toast.success("User registered successfully");
              navigate("/");
            } else {
              toast.error(`Error registering user: ${res.data.message}`);
            }
          })
          .catch((error) => {
            toast.error(`Error registering user: ${error.message}`);
          });
        })

  }
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      {/* BG Animation for small devices */}
      <div className="absolute inset-0 md:hidden opacity-20">
        <Lottie animationData={lottielogin} loop={true} />
      </div>

      <div className="relative z-10 md:bg-gray-50 flex flex-col md:flex-row items-center gap-10">
        {/* Left Animation (only for md+) */}
        <div className="hidden md:block w-96 h-80">
          <Lottie animationData={lottielogin} loop={true} />
        </div>

        {/* Login Form */}
        <div className="md:bg-white/90 md:backdrop-blur-md p-8 rounded-xl w-full md:max-w-sm shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="Email"
                className="text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                required
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="Password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="Password"
                name="Password"
                required
                placeholder="Enter your password"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10"
              />
              {/* Toggle Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={22} />
                ) : (
                  <AiFillEye size={22} />
                )}
              </button>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                forget password
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg text-center mb-4">Reset Your Password</h3>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <button type="submit" onClick={handleresetPassword} className="mt-4 text-white btn btn-primary rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Reset Password
                  </button>
                </div>
              </dialog>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

            {/* OR divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handlegoogle}
              className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
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
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* Extra Links */}
            <p className="text-sm text-gray-500 text-center mt-2">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
