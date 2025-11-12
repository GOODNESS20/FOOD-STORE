import React from "react";
import { useProduct } from "../ProductContext/productcontext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cart, placeOrder, setCart, user } = useProduct();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const payWithPaystack = () => {
    // ✅ Ensure user is logged in
    if (!user) {
      alert("Please login first to complete checkout.");
      navigate("/login");
      return;
    }

    // ✅ Ensure Paystack script loaded
    if (!window.PaystackPop) {
      alert("Paystack script not loaded yet. Please check your internet or reload the page.");
      return;
    }

    // ✅ Setup Paystack handler
    const handler = window.PaystackPop.setup({
      key: "pk_test_ff574bb74b298f8f8408d1771f3545b4dd2f2a11", // test key
      email: user.email || "customer@example.com",
      amount: total * 100, // amount in kobo
      currency: "NGN",
      ref: "PSK_" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: user.phone || "+2348012345678",
          },
        ],
      },

      // ✅ Paystack requires a normal function (NOT async)
      callback: function (response) {
        // Wrap async work inside an IIFE
        (async () => {
          try {
            alert("Payment successful! Reference: " + response.reference);

            const cleanCart = Array.isArray(cart)
    ? cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || null,
      }))
    : [];



            const newOrder = {
              reference: response.reference,
              items: cleanCart,
              total,
              userId: user?.id,
            };

            console.log("🧾 Sending order to backend:", newOrder);


            if (!cleanCart.length) {
    alert("Cart is empty — cannot save order.");
    return;
  }

            const res = await fetch("http://localhost:3000/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newOrder),
            });

            const data = await res.json();

            if (res.ok) {
              // ✅ Update UI instantly
              placeOrder({
                id: data.order.id,
                date: data.order.created_at,
                items: cleanCart,
                total,
              });

              setCart([]);
              navigate("/order");
            } else {
              console.error("Backend error:", data.error);
              alert("Order could not be saved. Try again.");
            }
          } catch (err) {
            console.error("Network error saving order:", err);
            alert("Something went wrong while saving your order.");
          }
        })();
      },

      // ✅ Handle cancel
      onClose: function () {
        alert("Payment cancelled.");
      },
    });

    // ✅ Open Paystack iframe safely
    if (handler && typeof handler.openIframe === "function") {
      handler.openIframe();
    } else {
      alert("Paystack handler not ready. Please reload and try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add items first.</p>
      ) : (
        <>
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <span>{item.name}</span>
                <span>
                  ₦{item.price} × {item.quantity || 1}
                </span>
              </div>
            ))}
          </div>

          <p className="checkout-total">Total: ₦{total}</p>

          {/* ✅ Paystack Payment Button */}
          <button className="pay-btn" onClick={payWithPaystack}>
            Pay Now with Paystack
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;


