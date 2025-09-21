import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import Rating from "react-rating";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthProvider";

const Productdetails = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState();
  const [product, setProduct] = useState(null);
  console.log(product);
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  console.log(reviews);


  // Find product
  useEffect(() => {
    const founddata = data?.find((p) => p._id === id);
    setProduct(founddata);
  }, [data, id]);

  // Fetch reviews for this product
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/products/${id}/reviews`)
        .then((res) => {
          console.log(res.data);

          setReviews(res.data);
        })
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading product details...
      </div>
    );
  }

  // Submit review
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewText = e.target.review.value;

    const reviewData = {
      name: user?.displayName || "Anonymous",
      photo: user?.photoURL,
      email: user?.email || null,
      productId: id,
      rating,
      reviewText,
      createdAt: new Date(),
    };

    axios
      .post(`http://localhost:3000/products/${id}/reviews`, reviewData)
      .then((res) => {
        toast.success("Review submitted successfully!", res);
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        toast.error("Failed to submit review.");
      });
    setReviews((prevReviews) => [...prevReviews, reviewData]);
    e.target.reset();
    setRating(null);
  };

  // Delete review
  const handleDeleteReview = (reviewId) => {
    axios.delete(`http://localhost:3000/reviews/${reviewId}`).then((res) => {
      toast.success("Review deleted successfully!", res);
      setReviews((prevreview) =>
        prevreview.filter((rev) => rev._id !== reviewId)
      );
    });
  };
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Product Details */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Product Details
      </h1>

      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6">
        {/* Product Image */}
  <div className="grid grid-cols-5 gap-4">
  {/* Left side thumbnails */}
  <div className="flex flex-col items-center justify-center gap-3 col-span-1">
    {product.images?.map((img, index) => (
      <img
        key={index}
        src={`http://localhost:3000${img}`}
        alt={`Thumbnail ${index}`}
        onClick={() => setSelectedImage(index)}
        className={`w-20 h-20 object-cover rounded cursor-pointer border ${
          selectedImage === index ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-300"
        }`}
      />
    ))}
  </div>

  {/* Main image */}
  <div className="col-span-4 flex justify-center items-center">
    {product.images?.length > 0 ? (
      <img
        src={`http://localhost:3000${product.images[selectedImage ?? 0]}`}
        alt={product.name}
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
    ) : (
      <p>No image available</p>
    )}
  </div>
</div>


        {/* Product Info */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
         
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Model:</span> {product.model}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Stock:</span>{" "}
            {Number(product.stock) > 0 ? (
              <span className="text-green-600 font-semibold">
                {product.stock} Available
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </p>
          <p className="text-2xl font-bold text-blue-600">Price: ${product.price}</p>

          <p className="text-xl font-bold text-gray-600">Quick Overview:</p>
          <div>
            
          </div>
          {/* <p className="text-gray-700 leading-relaxed">{product.description}</p> */}

          {/* <div>
            <p className="font-semibold text-lg mb-2">Specification</p>
            {product.specs && (
              <ul className="list-disc list-inside">
                {product.specs.split(",").map((spec, index) => (
                  <li key={index} className="text-gray-600">
                    {spec.trim()}
                  </li>
                ))}
              </ul>
            )}
          </div> */}

          <p className="font-semibold text-lg mb-2">Warranty</p>
          <p className="text-gray-600">{product.warranty}</p>

          <p className="text-gray-600">
            <span className="font-semibold">Added on :</span>{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to={`/payment/${product._id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10 bg-gray-50 p-6 rounded-2xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Leave a Review
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Rating
            initialRating={rating}
            emptySymbol={<span className="text-gray-300 text-3xl">★</span>}
            fullSymbol={<span className="text-yellow-400 text-3xl">★</span>}
            fractions={2}
            onChange={(rate) => setRating(rate)}
          />
          <textarea
            name="review"
            rows="3"
            placeholder="Write your honest review here..."
            className="w-full border border-green-300 rounded-lg p-3 text-sm"
            required
          ></textarea>
          <button
            type="submit"
            className="self-end bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow transition transform hover:scale-105"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div className="mt-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-gray-200 py-4 flex items-start justify-between"
              >
                {/* Left: User info + review */}
                <div className="flex gap-3">
                  <img
                    src={review.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={review.name || "User"}
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {review.name || "Anonymous"}
                    </h4>

                    <div className="flex items-center">
                      <Rating
                        initialRating={review.rating}
                        readonly
                        emptySymbol={
                          <span className="text-gray-300 text-xl">★</span>
                        }
                        fullSymbol={
                          <span className="text-yellow-400 text-xl">★</span>
                        }
                      />
                      <span className="ml-2 text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-1 text-gray-600">{review.reviewText}</p>
                  </div>
                </div>

                {/* Delete Icon (if user is the author) */}
                {user?.email === review.email && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
