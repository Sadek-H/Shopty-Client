import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
const Newarrivals = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        console.log(response.data);
        // Sort by createdAt (newest first)
        const sorted = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log(sorted);
        setProducts(sorted);
      } catch (error) {
        toast.error("Failed to fetch products!", error);
      }
    };

    fetchProducts();
  }, []);

  // const sort = products.sort((a, b) => (b.createdAt) - (a.createdAt));
  //     console.log(sort);

  return (
    <div className="py-12 bg-gray-50">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-10">
        New Arrivals
      </h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {products.map((p, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
         
            <div className="relative">
              <img
                className="h-56 w-full object-cover rounded-t-2xl"
                src={p.images ? p.images[0] : ""}
                alt={p.name}
              />

              <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg shadow">
                New
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-4">
              <h2 className="font-semibold text-lg text-gray-900 truncate">
                {p.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {p.description || "No description available."}
              </p>
              <p className="mt-3 text-xl font-bold text-blue-600">${p.price}</p>

              {/* Buttons */}
              <div className="flex justify-between gap-2 mt-auto pt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <Link
                  to={`/products/${p._id}`}
                  className="flex-1 text-center bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newarrivals;
