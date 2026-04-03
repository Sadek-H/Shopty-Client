import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VendorProduct = () => {
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    setMyProducts(res.data.product);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                My Products
            </h1>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {myProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                    >
                        {/* Image */}
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 truncate">
                                {product.name}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-lg font-bold text-blue-600">
                                    ৳ {product.price}
                                </span>

                                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {myProducts.length === 0 && (
                <div className="text-center mt-10 text-gray-500">
                    No products found.
                </div>
            )}
        </div>
    );
};

export default VendorProduct;