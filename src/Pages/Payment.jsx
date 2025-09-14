import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthProvider";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import PaymentStripe from "./Stripe/Payment";

const Payment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // Track selected method
  const [method, setMethod] = useState("sslcommerz");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.customer_email?.value;
    const phone = e.target.customer_phone?.value;
    console.log(method, email, phone);

    try {
      if (method === "sslcommerz") {
        const res = await axios.post("http://localhost:3000/payment/initiate", {
          email,
          phone,
          name: user?.displayName,
          method,
          status: "Pending",
          transactionId: id,
          date: new Date(),
        });
        if (res.data.gateurl) {
          window.location.href = res.data.gateurl;
        } else {
          toast.error("Payment initiation failed!");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Error initiating payment");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          💳 Secure Payment
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Complete your payment safely and quickly
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              name="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="sslcommerz">Pay with SSLCommerz</option>
              <option value="stripe">Pay with Stripe</option>
            </select>
          </div>

          {/* Show fields only if SSLCommerz selected */}
          {method === "sslcommerz" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="customer_email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="customer_phone"
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </>
          ):
            <div>
              <PaymentStripe />
            </div>

          }

          {/* Submit */}
         {
            method === "sslcommerz" && 
             <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
          >
            Proceed to Pay
          </motion.button>
         }
        </form>
      </motion.div>
    </div>
  );
};

export default Payment;
