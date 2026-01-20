import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthProvider";


const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
 const {user} = use(AuthContext);
 console.log(user);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Fetch clientSecret from backend
  useEffect(() => {
    if (!product?.price) return;

    setLoading(true);
    axios
      .post("https://shopty-server.onrender.com/create-payment-intent", {  id: product._id })
      .then((res) => {
      //  console.log("ClientSecret Response:", res.data);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("ClientSecret Error:", err);
        setErrorMsg("Failed to initiate payment. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [product?.price, product?._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 handleSubmit called");

    if (!stripe || !elements) {
      toast("Stripe or Elements not ready");
      return;
    }

    if (!clientSecret) {
      toast("ClientSecret not available yet");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const cardElement = elements.getElement(CardElement);

    stripe
      .confirmCardPayment(clientSecret, { payment_method: { card: cardElement } })
      .then((result) => {
        console.log(result);
        console.log("✅ confirmCardPayment result:", result); 

        if (result.error) {
          console.error("❌ Payment failed:", result.error);
          setErrorMsg(result.error.message);
        } 
        
        if(result.paymentIntent.status === "succeeded"){
          const paymentDetails = {
            email: user?.email,
            method: "stripe",
            transactionId: product.id,
            amount: product.price,
            date: new Date(),
          
          };
           axios
            .post("https://shopty-server.onrender.com/payments", 
              paymentDetails,
            )
            .then(() => {
              toast("Payment Successful");
            })
            .catch((err) => {
              console.error("Saving payment info failed:", err);
              setErrorMsg("Payment succeeded but saving info failed.");
            });
          }

        setSuccess(true);
      
         
        })

    
   };

  return (
    <div className="max-w-md mx-auto p-6 rounded shadow bg-white">
      {success ? (
        <div className="text-green-600 font-semibold text-center">
          ✅ Payment successful!
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
            onAbort={(e) => e.preventDefault()}
            disabled={!stripe || loading || !clientSecret}
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
