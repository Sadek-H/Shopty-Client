import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user , signout } = useContext(AuthContext);
  console.log(user);
  const handleLogout = ()=>{
     signout()
     .then(()=>{
       toast.success("Logged out successfully"); 
     })
     setIsOpen(false);
  }
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-9"
              alt="Logo"
            />
            <span className="text-2xl font-bold text-gray-800 tracking-wide">
              Shopty
            </span>
          </NavLink>

          {/* Desktop Menu Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <NavLink to="/" className="hover:text-blue-600 transition">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-blue-600 transition">
              Products
            </NavLink>
            <NavLink to="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:order-2">
            {/* Search Bar */}
            <div className="relative w-40 sm:w-56">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-xl 
                shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 20 20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 19l-4-4m0-7a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Desktop Login/Register */}
            <div className="hidden lg:flex gap-3">
             {
              user ? 
              <>
              <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="" />
              <NavLink
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-600 
                rounded-xl hover:bg-blue-50 shadow-sm transition"
              >
                Logout
              </NavLink>
              </> :
              <>
               <NavLink
                to="/login"
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 
                rounded-xl shadow hover:scale-105 transform transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-600 
                rounded-xl hover:bg-blue-50 shadow-sm transition"
              >
                Register
              </NavLink>
              </>
             }
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={` lg:hidden transition-all duration-300 overflow-hidden mb-2 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-4 mt-4 text-gray-700 font-medium">
            <li>
              <NavLink
                to="/"
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>

            {/* Mobile Login/Register */}
            <li className="flex gap-2 mt-2 w-max">
           {
            user ? 
            <>
             <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="" />
              <NavLink
                 to="/login"
                className="flex-1 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 shadow-sm transition"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </> :
            <>
              <NavLink              
                to="/login"
                className="flex-1 px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow hover:scale-105 transform transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="flex-1 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 shadow-sm transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
           }
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
