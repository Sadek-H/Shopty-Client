import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { FaHome, FaBox, FaClipboardList, FaUserShield, FaUserPlus, FaPlus, FaUsers, FaTools, FaMotorcycle } from "react-icons/fa";

const Dashlayout = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${user?.email}`).then((res) => {
      if (res.data) {
        setUsers(res.data);
        console.log(res.data);
      };
    });
  }, [user?.email]);

  //const currentUser = users.find((u) => u.email === user?.email);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Navbar */}
      <div className="bg-base-100 shadow-sm">
        <div className="navbar px-4 flex justify-between items-center">
          {/* Left (Logo + Menu) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-square btn-ghost md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <span className="font-bold text-lg">🌐 MyDashboard</span>
          </div>

          {/* Right (Profile + Logout) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={user?.photoURL || "https://i.ibb.co/8mcr0z8/user.png"}
                alt="profile"
                className="w-8 h-8 rounded-full border"
              />
            </div>
            <button className="btn btn-sm btn-error text-white">Logout</button>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-1 relative bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 min-h-screen z-30 shadow-md bg-white transition-all duration-300 overflow-hidden
            ${isOpen ? "w-64" : "w-0 md:w-64"}
          `}
        >
          <div className={`${isOpen ? "block" : "hidden"} md:block p-4 relative h-full`}>
            {/* Close button (mobile only) */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden absolute top-4 right-4 btn btn-circle btn-ghost"
            >
              ✕
            </button>

            {/* Sidebar content */}
            <ul className="menu space-y-2 mt-10 md:mt-0">
              {/* User */}
              {users?.role === "user" && (
                <>
                  <li>
                    <NavLink to="/" className="flex items-center gap-2"><FaHome /> Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/products" className="flex items-center gap-2"><FaBox /> Cart Manage</NavLink>
                  </li>
                  <li>
                    <NavLink to="/reports" className="flex items-center gap-2"><FaClipboardList /> Order List</NavLink>
                  </li>
                  <li>
                    <NavLink to="become-vendor" className="flex items-center gap-2"><FaUserPlus /> Become a Vendor</NavLink>
                  </li>
                  <li>
                    <NavLink to="become-rider" className="flex items-center gap-2"><FaMotorcycle /> Become a Rider</NavLink>
                  </li>
                </>
              )}

              {/* Vendor */}
              {users?.role === "vendor" && (
                <>
                  <li>
                    <NavLink to="/" className="flex items-center gap-2"><FaHome /> Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/vendor/products" className="flex items-center gap-2"><FaBox /> My Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="add-product" className="flex items-center gap-2"><FaPlus /> Add Product</NavLink>
                  </li>
                  <li>
                    <NavLink to="/vendor/orders" className="flex items-center gap-2"><FaClipboardList /> User Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/vendor/riders" className="flex items-center gap-2"><FaMotorcycle /> Available Riders</NavLink>
                  </li>
                </>
              )}

              {/* Admin */}
              {users?.role === "admin" && (
                <>
                  <li>
                    <NavLink to="/admin" className="flex items-center gap-2"><FaTools /> Admin Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/users" className="flex items-center gap-2"><FaUsers /> Manage Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/reports" className="flex items-center gap-2"><FaClipboardList /> Reports</NavLink>
                  </li>
                </>
              )}

              {/* Rider */}
              {users?.role === "rider" && (
                <>
                  <li>
                    <NavLink to="/rider" className="flex items-center gap-2"><FaMotorcycle /> Rider Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/rider/orders" className="flex items-center gap-2"><FaBox /> Delivery Orders</NavLink>
                  </li>
                </>
              )}
            </ul>
            <p className="text-gray-400 text-sm">Logged in as: {users?.email}</p>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 bg-transparent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashlayout;
