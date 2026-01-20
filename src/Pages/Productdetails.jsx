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
  console.log(data);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
 console.log(product);
  useEffect(() => {
    const founddata = data.product.find((p) => p._id = id);
    setProduct(founddata);
  }, [data, id]);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://shopty-server.onrender.com/products/${id}/reviews`)
        .then((res) => setReviews(res.data))
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

  // Handle review submit
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
      .post(`https://shopty-server.onrender.com/products/${id}/reviews`, reviewData)
      .then((res) => {
        console.log(res.data);
        toast.success("Review submitted successfully!");
        setReviews((prevReviews) => [...prevReviews, res.data]);
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        toast.error("Failed to submit review.");
      });

    e.target.reset();
    setRating(null);
  };

  // Handle review delete
  const handleDeleteReview = (reviewId) => {
    axios.delete(`https://shopty-server.onrender.com/reviews/${reviewId}`).then(() => {
      toast.success("Review deleted successfully!");
      setReviews((prevreview) =>
        prevreview.filter((rev) => rev._id !== reviewId)
      );
    });
  };

  // Specifications parse
  let specifications = [];
  try {
    specifications =
      typeof product.specifications === "string"
        ? JSON.parse(product.specifications)
        : product.specifications || [];
  } catch (err) {
    specifications = [];
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* GRID like Amazon/Daraz */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* LEFT - Image Gallery */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl shadow">
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${
                    selectedImage === index
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={
                  product.images?.[selectedImage] || ""
                }
                alt={product.name}
                className="rounded-lg shadow-lg max-h-[500px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* MIDDLE - Product Info */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <Rating
              initialRating={
                reviews.length > 0
                  ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
                  : 0
              }
              readonly
              emptySymbol={<span className="text-gray-300 text-lg">★</span>}
              fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
            />
            <span className="text-sm text-gray-500">
              ({reviews.length} Reviews)
            </span>
          </div>

          <p className="text-gray-600">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Model:</span> {product.model}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Warranty:</span> {product.warranty}
          </p>

          <p className="text-lg font-semibold">Quick Overview:</p>
          <ul className="list-disc list-inside text-gray-700">
            {specifications.slice(0, 4).map((spec, idx) => (
              <li key={idx}>
                {spec.key}: {spec.value}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT - Purchase Box */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow space-y-4 border">
          <p className="text-3xl font-bold text-blue-600">${product.price}</p>
          <p className="text-sm text-gray-500">
            Added on {new Date(product.createdAt).toLocaleDateString()}
          </p>

          {product.stock > 0 ? (
            <p className="text-green-600 font-semibold">
              In Stock ({product.stock} available)
            </p>
          ) : (
            <p className="text-red-600 font-semibold">Out of Stock</p>
          )}

          <Link
            to={`/payment/${product._id}`}
            className="block text-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Buy Now
          </Link>
          <button className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* DETAILS & REVIEWS SECTION */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <div className="flex gap-6 border-b pb-3 mb-4">
          <a
            href="#details"
            className="font-semibold text-gray-700 hover:text-blue-600"
          >
            Product Details
          </a>
          <a
            href="#specs"
            className="font-semibold text-gray-700 hover:text-blue-600"
          >
            Specifications
          </a>
          <a
            href="#reviews"
            className="font-semibold text-gray-700 hover:text-blue-600"
          >
            Reviews
          </a>
        </div>

        {/* Full Description */}
        <div id="details" className="mb-8">
          <h3 className="text-xl font-bold mb-2">Product Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div id="specs" className="mb-8">
          <h3 className="text-xl font-bold mb-2">Specifications</h3>
          <table className="w-full border text-sm">
            <tbody>
              {specifications.map((spec, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-3 py-2 font-medium w-1/3 bg-gray-50">
                    {spec.key}
                  </td>
                  <td className="px-3 py-2">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reviews */}
        <div id="reviews">
          <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

          {/* Review Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-6 bg-gray-50 p-4 rounded-lg"
          >
            <Rating
              initialRating={rating}
              emptySymbol={<span className="text-gray-300 text-2xl">★</span>}
              fullSymbol={<span className="text-yellow-400 text-2xl">★</span>}
              fractions={2}
              onChange={(rate) => setRating(rate)}
            />
            <textarea
              name="review"
              rows="3"
              placeholder="Write your honest review..."
              className="w-full border rounded-lg p-3 text-sm mt-3"
              required
            ></textarea>
            <button
              type="submit"
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Submit Review
            </button>
          </form>

          {/* Review List */}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border-b py-4 flex items-start justify-between"
              >
                <div className="flex gap-3">
                  <img
                    src={review.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={review.name || "User"}
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">
                      {review.name || "Anonymous"}
                    </h4>
                    <Rating
                      initialRating={review.rating}
                      readonly
                      emptySymbol={
                        <span className="text-gray-300 text-sm">★</span>
                      }
                      fullSymbol={
                        <span className="text-yellow-400 text-sm">★</span>
                      }
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      {review.reviewText}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {user?.email === review.email && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-500 hover:text-red-700"
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
