import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";


const Register = () => {
  const { createUser, signout, signInWithGoogle, setUser, updateuser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const alldata = Object.fromEntries(formdata.entries());
    const { email, password, name, photo } = alldata;

    // Password validation
    const passtest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passtest.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    // Create user with Firebase
    createUser(email, password)
      .then((res) => {
        if (res.user) {
          console.log(res.user);
          updateuser({
            displayName: name,
            photoURL: photo
          })
          setUser({ ...res.user , displayName: name, photoURL: photo});
          // Backend API call
          axios
            .post("https://shopty-server.onrender.com/register", {
              email,
              name,
              photo,
              role: "user",
            })
            .then((res) => {
              if (res.data.success) {
                toast.success("User registered successfully");
                setError("");
                // Logout after register so only login can show profile
                signout().then(() => {
                  form.reset();
                  navigate("/login");
                });
              } else {
                toast.error(`Error registering user: ${res.data.message}`);
              }
            })
            .catch((error) => {
              toast.error(`Error registering user: ${error.message}`);
            });
        }
      })
      .catch((error) => {
        toast.error(`Error registering user: ${error.message}`);
      });
  };

  const handleWithGoogle = () => {
    signInWithGoogle().then((res) => {
      axios
        .post("https://shopty-server.onrender.com/register", {
          email: res.user.email,
          name: res.user.displayName,
          photo: res.user.photoURL,
          role: "user",
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
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full bg-white">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2 relative bg-gray-100">
          <img
            src="https://i.postimg.cc/vTSfNBMb/registration-application-paper-form-concept.jpg"
            alt="Register illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
            Create Your Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-5"
          >
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="w-full px-4 py-2 border rounded-xl"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-xl"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Register
            </button>

            <p className="text-center text-gray-500 text-xs">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>

            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleWithGoogle}
              className="flex items-center justify-center gap-2 py-2 border rounded-xl hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
