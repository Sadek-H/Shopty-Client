import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiPlus, FiMinus } from "react-icons/fi";

const categoryData = {
  Electronics: ["Mobile", "Laptops", "Headphones", "Cameras"],
  Books: ["Fiction", "Non-fiction", "Comics", "Education"],
  Fashion: ["Men", "Women", "Accessories", "Shoes"],
  Gaming: ["Consoles", "Games", "Accessories"],
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openCategory, setOpenCategory] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleCategory = (category) => {
    console.log(category);
    setOpenCategory(openCategory === category ? null : category);

  };

  const Selectcat=(sub)=>{
    console.log(sub.toLowerCase());
    setSelectedCategory(sub);
  }

 const handleapply = () => {
  setProducts([null]);
  const filtered = products.filter(
    (p) => p.subcategory.toLowerCase() === selectedCategory.toLowerCase()
  );

  setProducts(filtered);
   
  console.log(filtered);
};


  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-2xl shadow-md p-6 max-h-screen md:sticky top-20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Filters
          </h2>

          {/* Category Accordion */}
          <div className="space-y-4">
            {Object.keys(categoryData).map((category, idx) => (
              <div key={idx} className=" pb-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >  
                  <span className="font-medium text-gray-700">{category}</span>
                  {openCategory === category ? (
                    <FiMinus className="text-gray-600" />
                  ) : (
                    <FiPlus className="text-gray-600" />
                  )}
                </div>

                {/* Subcategories */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openCategory === category ? "max-h-40 mt-2" : "max-h-0"
                  }`}
                >
                  <ul className="pl-4 space-y-1 text-sm text-gray-600">
                    {categoryData[category].map((sub, i) => (
                      <li
                      onClick={() => Selectcat(sub)}
                        key={i}
                        className={`${
                          selectedCategory === sub ? "bg-blue-600 text-white rounded-lg" : "hover:text-indigo-600"
                        } cursor-pointer px-2 py-1`}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Example Static Sections */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-indigo-600 cursor-pointer">
                Under $50
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                $50 - $200
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">
                Above $200
              </li>
            </ul>
          </div>

          <button onClick={handleapply} className="mt-6 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
            Apply Filters
          </button>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={p.images && p.images.length > 0 ? p.images[0] : ""}
                      alt={p.name}
                    />
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                      New
                    </span>
                  </div>

                  <div className="p-5 flex flex-col">
                    <h2 className="font-semibold text-lg text-gray-900 truncate">
                      {p.name}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {p.description || "No description available."}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xl font-bold text-indigo-600">
                        ${p.price}
                      </p>
                    </div>

                    <div className="flex gap-3 mt-5">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
                        Add to Cart
                      </button>
                      <Link
                        to={`/products/${p._id}`}
                        className="flex-1 text-center bg-gray-100 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
