import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const BecomeRider = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Rider Application:', data);


    axios.post("http://localhost:3000/becomeRiders", data)
      .then((res) => {
       if(res.data){
         toast.success("Rider added successfully!");
       }
      })
      .catch((error) => {
        toast.error("There was an error submitting your application.", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden  w-full">
        
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://i.postimg.cc/QxqvXbsM/3737445.jpg"
            alt="Rider-img"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Become a Rider</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Vehicle Type</label>
              <select
                name="vehicleType"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="">Select Vehicle</option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
                <option value="van">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold mt-4"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeRider;
