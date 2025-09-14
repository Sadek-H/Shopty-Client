import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const BecomeVendor = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Vendor Request:", data);
   

    axios.post("http://localhost:3000/becomevendors", data)
      .then(() => {
        toast.success("Vendor added successfully!");
       
      })
      .catch((error) => {
        toast.error("There was an error submitting your application.",error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full border border-gray-200">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-2">
          Become a Vendor
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Apply now to sell your products on our platform.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+880 1XXXXXXXXX"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Shop Name */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Shop Name
            </label>
            <input
              type="text"
              name="shopName"
              placeholder="Your shop name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Business Category
            </label>
            <select
              name="category"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="gaming">Gaming</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Shop Address */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Shop Address
            </label>
            <textarea
              name="address"
              placeholder="Enter shop address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              rows="3"
              required
            />
          </div>

          {/* NID/Trade License */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              NID / Trade License No.
            </label>
            <input
              type="text"
              name="license"
              placeholder="Enter NID / License number"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Apply as Vendor
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeVendor;
