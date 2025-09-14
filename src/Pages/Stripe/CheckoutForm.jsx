import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Fetch clientSecret from backend
  useEffect(() => {
    if (!product?.price) return;

    setLoading(true);
    axios
      .post("http://localhost:3000/create-payment-intent", { price: product.price })
      .then((res) => {
      //  console.log("ClientSecret Response:", res.data);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("ClientSecret Error:", err);
        setErrorMsg("Failed to initiate payment. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [product?.price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 handleSubmit called");

    if (!stripe || !elements) {
      console.warn("Stripe or Elements not ready");
      return;
    }

    if (!clientSecret) {
      console.warn("ClientSecret not available yet");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const cardElement = elements.getElement(CardElement);

    stripe
      .confirmCardPayment(clientSecret, { payment_method: { card: cardElement } })
      .then((result) => {
        console.log("✅ confirmCardPayment result:", result); 

        if (result.error) {
          console.error("❌ Payment failed:", result.error);
          setErrorMsg(result.error.message);
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
          console.log("🎉 PaymentIntent:", result.paymentIntent);
          setSuccess(true);

          // Optional: save to backend
          axios
            .post("http://localhost:3000/payments", {
              productId: product._id,
              amount: product.price,
              paymentId: result.paymentIntent.id,
              status: result.paymentIntent.status,
              date: new Date(),
            })
            .then(() => console.log("Payment info saved to backend"))
            .catch((err) => {
              console.error("Saving payment info failed:", err);
              setErrorMsg("Payment succeeded but saving info failed.");
            });
        }
      })
      .catch((err) => {
        console.error("Stripe confirmCardPayment error:", err);
        setErrorMsg("Payment failed. Please try again.");
      })
      .finally(() => setLoading(false));
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
