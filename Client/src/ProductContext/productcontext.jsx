import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
   const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => setUser(null);

  const placeOrder = (order) => setOrders((prev) => [...prev, order]);

const addToCart = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product or missing id:", product);
      return;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      console.log("Cart after add:", updatedCart);
      return updatedCart;
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <ProductContext.Provider value={{ cart, selectedProduct, setSelectedProduct, addToCart, setCart, user, setUser, loginUser, logoutUser,
        orders, placeOrder }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);