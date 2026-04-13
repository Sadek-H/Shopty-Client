import React from "react";
import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Dashboardlayout from "../Layout/Dashboardlayout";
import Login from "../Auth/Authentication/Login";
import Register from "../Auth/Authentication/Register";
import Addproduct from "../Pages/Dashboard/vendor/Addproduct";
import BecomeVendor from "../Pages/Dashboard/User/Become-vendor";
import BecomeRider from "../Pages/Dashboard/User/BecomeRider";
import Productdetails from "../Pages/Productdetails";
import Payment from "../Pages/Payment";
import SuccessPay from "../Pages/SuccessPay";
import Products from "../Pages/Products/Products";
import Cartmanage from "../Pages/Dashboard/User/cartmanage";
import Orderlist from "../Pages/Dashboard/User/Orderlist";
import VendorProduct from "../Pages/Dashboard/vendor/VendorProduct";
import Riders from "../Pages/Dashboard/vendor/Riders";
import Manageusers from "../Pages/Dashboard/Admin/Manageusers";
import VendorRequest from "../Pages/Dashboard/Admin/Vendor-request";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/products/:id",
        element: <Productdetails />,
        loader: () => fetch("http://localhost:3000/products"),
      },
      {
        path: "/payment/:id",
        element: <Payment />,
        loader: () => fetch("http://localhost:3000/products"),
      },
      {
        path: "/success",
        element: <SuccessPay />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboardlayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "cart",
        element: <Cartmanage/>,
      },
      {
        path: "orders",
        element: <Orderlist/>,
      },
      {
        path: "add-product",
        element: <Addproduct />,
      },
      {
        path: "become-vendor",
        element: <BecomeVendor />,
      },
      {
        path: "become-rider",
        element: <BecomeRider />,
      },
      {
        path: "Myproducts",
        element: <VendorProduct />,
      },
      {
        path: "riders",
        element: <Riders />,
      },
      {
        path: "users",
        element: <Manageusers />,
        loader: ()=> fetch("http://localhost:3000/users"),
      },
      {
        path: "vendor-requests",
        element: <VendorRequest />,
      },
    ],
  },
]);

export default router;
