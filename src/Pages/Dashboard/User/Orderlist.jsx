import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider";

const Orderlist = () => {
  const [order, setOrder] = useState([]);
  const user = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    axios.get(`http://localhost:3000/orders/${user?.email}`)
      .then((res) => {
        console.log(res.data);
        setOrder(res.data.payments);
      });
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold text-center mb-8">
        My Orders
      </h2>

      {order.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {order.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.productName}
              </h3>

              <p className="text-gray-600">
                <span className="font-semibold">Quantity:</span> {item.quantity}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Order ID:</span> {item._id}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                  ${item.price}
                </span>

                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Details
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orderlist;