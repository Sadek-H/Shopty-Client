import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Globalsearchcontext } from "../Globalsearchprovider";

const categoryData = {
  Electronics: ["Mobile", "Laptops", "Headphones", "Cameras"],
  Books: ["Fiction", "Non-fiction", "Comics", "Education"],
  Fashion: ["Men", "Women", "Accessories", "Shoes"],
  Gaming: ["Consoles", "Games", "Accessories"],
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [subcategory, setSubcategory] = useState({});
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const params = new URLSearchParams(window.location.search);
const initialPage = parseInt(params.get("page")) || 1;
const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 3;
  const {query} = useContext(Globalsearchcontext);

const filtersearch = products.filter((p)=>
  p.name.toLowerCase().includes(query.toLowerCase())
)

  useEffect(() => {
    axios.get("http://localhost:3000/subcategories").then((res) => {
      if (res.data.length === 0) {
        axios
          .post("http://localhost:3000/subcategories", categoryData)
          .then((res) => setSubcategory(res.data));
      } else {
        const { _id, ...rest } = res.data;
        console.log(rest);
        setSubcategory(rest);
      }
    });
  }, []);

  const fetchProducts = async (page = 1) => {
  const skip = (page - 1) * itemsPerPage;
  const params = {
    subcategory: selectedCategory || "",
    price: selectedPrice || "",
    skip,
    limit: itemsPerPage,
  };

  try {
    const res = await axios.get("http://localhost:3000/products", { params });
    setProducts(res.data.result);
    setTotalPages(Math.ceil(res.data.totalcount / itemsPerPage));
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const sub = params.get("subcategory");
  const price = params.get("price");
  console.log(price);
  if (sub) setSelectedCategory(sub);
  if (price) setSelectedPrice(price);

  fetchProducts(currentPage);
}, [currentPage]);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const selectCategory = (sub) => {
    console.log(sub);
    setSelectedCategory(sub);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

 const handleApply = async () => {
  try {
    const params = {};
    if (selectedCategory) params.subcategory = selectedCategory;
    if (selectedPrice) params.price = selectedPrice;

    const res = await axios.get("http://localhost:3000/products", { params });
    setProducts(res.data.result);
    setTotalPages(Math.ceil(res.data.totalcount / itemsPerPage));
    setCurrentPage(1); // reset to first page

    // Update URL so filters persist
    const queryString = new URLSearchParams(params).toString();
    window.history.pushState({}, "", `?${queryString}`);
  } catch (err) {
    console.error("Error applying filters:", err);
  }
};



  // const indexofLastitem = currentPage * itemsPerPage;
  // const indexofFirstitem = indexofLastitem - itemsPerPage;
  // const currentItems = products.slice(
  //   indexofFirstitem,
  //   indexofLastitem
  // );
  // console.log(currentItems);

  const handlepage = (idx) => {
    console.log(idx + 1);
    const page = idx + 1;
    setCurrentPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState({}, "", `?${params.toString()}`);
    fetchProducts(page);
  };
 
const handleAll=()=>{
  setSelectedCategory("");
  setSelectedPrice("");
  fetchProducts(1);
  window.history.pushState({}, "", `/products`);
}
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-2xl shadow-md p-6 h-fit md:sticky top-20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Filters
          </h2>

          {/* Categories */}
          <div className="space-y-4">
            <button onClick={handleAll} className="font-medium text-gray-700 hover:text-indigo-600">All</button>
            {Object.keys(subcategory).map((category, idx) => (
              <div key={idx} className="pb-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <span className="font-medium text-gray-700">{category}</span>
                  {openCategory === category ? <FiMinus /> : <FiPlus />}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openCategory === category ? "max-h-40 mt-2" : "max-h-0"
                  }`}
                >
                  <ul className="pl-4 space-y-1 text-sm text-gray-600">
                    {(subcategory[category] || []).map((sub, i) => (
                      <li
                        key={i}
                        className={`${
                          selectedCategory === sub
                            ? "bg-blue-600 text-white rounded-lg"
                            : "hover:text-indigo-600"
                        } cursor-pointer px-2 py-1`}
                        onClick={() => selectCategory(sub)}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {["under50", "50to200", "above200"].map((priceRange) => (
                <li key={priceRange} className="flex items-center">
                  <input
                    type="radio"
                    value={priceRange}
                    checked={selectedPrice === priceRange}
                    onChange={handlePriceChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="ml-2">
                    {priceRange === "under50"
                      ? "Under $50"
                      : priceRange === "50to200"
                      ? "$50 - $200"
                      : "Above $200"}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleApply}
            className="mt-6 w-full bg-indigo-500 text-sm md:text-base text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Apply Filters
          </button>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          {query?filtersearch : products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {query?filtersearch : products.map((p) => (
                <div
                  key={p._id}
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
          {/* pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlepage(idx)}
                className=" bg-gray-300 px-4 py-2 m-2 rounded-lg hover:bg-gray-400 transition"
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
