import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";
const stripePromice = loadStripe(import.meta.env.VITE_payment_key);
const PaymentStripe = () => {
  const [selectedproduct, setSelectedproduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://shopty-server.onrender.com/products/${id}`).then((response) => {
      //  console.log(response.data);
      setSelectedproduct(response.data);
    });
  }, [id]);
  return (
    <div>
      <Elements stripe={stripePromice}>
        <CheckoutForm product={selectedproduct} />
      </Elements>
    </div>
  );
};

export default PaymentStripe;
