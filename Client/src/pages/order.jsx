// src/pages/Orders.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../ProductContext/productcontext";
import "./Order.css";

function Orders() {
  const { user, orders } = useProduct();
  const navigate = useNavigate();

  if (!user) {
    return <p>Please login to view your orders.</p>;
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>{user.username}'s Orders</h2>
        <div className="orders-buttons">
          <button className="back-btn" onClick={() => navigate("/")}>
            ⬅ Back to Shop
          </button>
          <button className="profile-btn" onClick={() => navigate("/profile")}>
            👤 Profile
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <p>You don’t have any orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
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
    </div>
  );
}

export default Orders;
