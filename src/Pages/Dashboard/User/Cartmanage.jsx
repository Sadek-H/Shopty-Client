import { useState } from "react";
import { Link } from "react-router";

const Cartmanage = () => {

  const [cartItems, setCartItems] = useState([
    {
      _id: "1",
      name: "Fresh Tomato",
      price: 40,
      quantity: 2,
      image: "https://i.ibb.co/6RZq9cB/tomato.jpg",
    },
    {
      _id: "2",
      name: "Potato",
      price: 30,
      quantity: 1,
      image: "https://i.ibb.co/T0bFZqM/potato.jpg",
    },
  ]);

  const handleIncrease = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updated);
  };

  const handleDecrease = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h2 className="text-3xl font-bold mb-6 text-center">
        🛒 My Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/products"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-500">৳ {item.price}</p>
                </div>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item._id)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item._id)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Section */}
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">
              Total: ৳ {totalPrice}
            </h3>

            <div className="flex gap-4">
              <Link
                to="/products"
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Continue Shopping
              </Link>

              <Link
                to="/checkout"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cartmanage;