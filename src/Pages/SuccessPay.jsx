import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const SuccessPay = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center max-w-md w-full"
      >
       

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful 🎉</h1>
        <p className="mt-2 text-gray-600 text-center">
          Thank you for your purchase! Your order has been confirmed.
        </p>

        {/* Divider */}
        <div className="w-full border-t mt-6 mb-4"></div>

        {/* Order Summary Example (Optional) */}
        <div className="bg-gray-50 w-full rounded-lg p-4 text-sm text-gray-700 shadow-inner">
          <p>
            <span className="font-semibold">Transaction ID:</span> #REF123456
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span> ৳1200 BDT
          </p>
        </div>

        {/* Button */}
        <Link
          to="/products"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 rounded-xl shadow-md text-center"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessPay;
