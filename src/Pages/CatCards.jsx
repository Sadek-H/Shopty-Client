import React from "react";
import { FaLaptop, FaBookOpen, FaTshirt, FaGamepad } from "react-icons/fa";

const CatCards = () => {
  const categories = [
    { name: "Electronics", icon: <FaLaptop className="w-8 h-8" /> },
    { name: "Books", icon: <FaBookOpen className="w-8 h-8" /> },
    { name: "Fashion", icon: <FaTshirt className="w-8 h-8" /> },
    { name: "Gaming", icon: <FaGamepad className="w-8 h-8" /> },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Shop by Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center h-32 rounded-xl shadow-md text-white 
            bg-gradient-to-r ${cat.color} cursor-pointer transform hover:scale-105 hover:shadow-xl transition`}
          >
            <div className="mb-2 text-blue-500">{cat.icon}</div>
            <p className="text-lg text-black font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatCards;
