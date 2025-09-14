import React from "react";
import Navbar from "../Component/Navbar";
import Banner from "../Component/Banner";
import CatCards from "../Pages/CatCards";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const Mainlayout = () => {
  return (
    <div>
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
      <Navbar />
      <Outlet />
      {/* <Banner/>
            <CatCards/> */}
    </div>
  );
};

export default Mainlayout;
