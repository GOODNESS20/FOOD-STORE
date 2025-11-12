import React, { useEffect } from "react";
import { useProduct } from "../ProductContext/productcontext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ isOpen, onClose }) {
  const { cart, setCart } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  // Increase item quantity
  const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Decrease item quantity
  const decreaseQuantity = (product) => {
    const updatedCart = cart
      .map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  // Remove item
  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter((p) => p.id !== productToRemove.id);
    setCart(updatedCart);
    alert(`${productToRemove.name} removed from cart!`);

  };

  // Calculate total
  const calculateTotal = () =>
    cart.reduce(
      (total, product) =>
        total + (product.price || 0) * (product.quantity || 1),
      0
    );

  // Navigate to checkout
  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay behind drawer */}
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>

        <button
          onClick={onClose}
          style={{
            alignSelf: "flex-end",
            background: "transparent",
            border: "none",
            color: "#2e7d32",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty. Start shopping!</p>
        ) : (
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product.id} className="cart-item">
                <span>{product.name}</span>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(product)}>-</button>
                  <span>{product.quantity || 1}</span>
                  <button onClick={() => increaseQuantity(product)}>+</button>
                </div>
                <span>₦{(product.price || 0) * (product.quantity || 1)}</span>
                <button onClick={() => removeFromCart(product)}><DeleteIcon /></button>
              </div>
            ))}
          </div>
        )}

        <p>Total: ₦{calculateTotal()}</p>

        {cart.length > 0 && (
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </>
  );
}

export default Cart;
