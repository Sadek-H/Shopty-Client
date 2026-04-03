import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
const Cartmanage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/cart")
      .then((res) => {
        console.log(res);
        setCart(res.data.carts);
      });
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleremovecart = (id) => {
      axios.delete(`http://localhost:3000/cart/${id}`,  { id  })
        .then((res) => {
            console.log(res.data);
            setCart((precart) => precart.filter((item) => item._id !== id));
            toast.success("Item removed from cart");

        })
        .catch((err) => {
          console.error("Error removing item from cart:", err);
          toast.error("Failed to remove item from cart");
        });

  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6 text-center">
        🛒 My Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold">Your cart is empty</h3>
          <p className="text-gray-500 mt-2">Add some items to your cart!</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.cardId} className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mb-4">
              <div className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image[0]}
                    alt={item.cartname}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{item.cartname}</h4>
                    <p className="text-gray-500">৳ {item.price}</p>
                  </div>
                </div>

                <button onClick={() => handleremovecart(item._id)} className="text-red-500 font-semibold">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center max-w-4xl mx-auto">
            <h3 className="text-xl font-bold">
              Total: ৳ {total}
            </h3>

            <div className="flex gap-4">
              <Link to="/products" className="bg-gray-300 px-4 py-2 rounded">
                Continue Shopping
              </Link>

              <Link to={`/payment/${cart[0]._id}`} className="bg-green-500 text-white px-4 py-2 rounded">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cartmanage;