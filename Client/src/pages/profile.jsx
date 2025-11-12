import React from "react";
import { useProduct } from "../ProductContext/productcontext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { user, orders, logoutUser } = useProduct();
  const navigate = useNavigate();

  if (!user) {
    return <p>Please login to access your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h2>Welcome, {user.username}!</h2>
      <div>
        <button className="back-btn" onClick={() => navigate("/order")}>
            ⬅ Back to Orders
      </button>
      </div>

      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id}>
              <p><strong>Order #{order.id}</strong></p>
              <p>Date: {order.date}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity || 1} — ₦{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <button className="logout-btn" onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default Profile;
