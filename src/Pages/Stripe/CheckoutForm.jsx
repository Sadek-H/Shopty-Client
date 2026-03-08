import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthProvider";
import { EmailAuthCredential } from "firebase/auth";


const CheckoutForm = ({ product }) => {
  console.log(product);
  const stripe = useStripe();
  const elements = useElements();
 const {user} = useContext(AuthContext);
 //console.log(user);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Fetch clientSecret from backend
  useEffect(() => {
    console.log("useEffect running");
    if (!product?.price){
      console.log("No product id");
      return;
    } 

    setLoading(true);
    axios
      .post("https://shopty-server.onrender.com/create-payment", {  id: product._id })
      .then((res) => {
       console.log("ClientSecret Response:", res.data);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("ClientSecret Error:", err);
        setErrorMsg("Failed to initiate payment. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [product?.price, product?._id]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements || !clientSecret) return;

  setLoading(true);
  setErrorMsg("");

  const cardElement = elements.getElement(CardElement);

  try {
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });
    console.log(result);

    if (result.error) {
      setErrorMsg(result.error.message);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
     const paymentDetails = {
    email: user?.email,
  transactionId: result.paymentIntent.id,
  amount: product.price,
  currency: "usd",
  paymentMethod: "card",
  status: result.paymentIntent.status,
};

      await axios.post(
        "https://shopty-server.onrender.com/payments",
        paymentDetails
      );

      toast("Payment Successful");
      setSuccess(true);
    }
  } catch (err) {
    console.error(err);
    setErrorMsg("Payment failed");
  } finally {
    setLoading(false); 
  }
};


  return (
    <div className="max-w-md mx-auto p-6 rounded shadow bg-white">
      {success ? (
        <div className="text-green-600 font-semibold text-center">
           Payment successful!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            className="border p-3 rounded"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
           
            disabled={!stripe  || !clientSecret}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
