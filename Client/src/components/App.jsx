import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import Cart from "../pages/cart";
import Login from "../Login/login";
import Header from "../Header/header";
import ProductSection from "../ProductSection/ProductSection";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProductProvider } from "../ProductContext/productcontext";
import ProductCard from "../ProductCard/productcard";
import Footer from "../Footer/footer";
import About from "../pages/about";
import Checkout from "../pages/checkout";
import Profile from "../pages/profile";
import Orders from "../pages/order";
import ProtectedRoutes from "./protectedroutes";


function App (){
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    useEffect(() => { console.log("App isCartOpen:", isCartOpen); }, [isCartOpen]);
    const location = useLocation();

  // Hide layout (Header, Navbar, Footer) on specific pages
  const hideLayout = location.pathname === "/checkout" || location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/order" || location.pathname === "/profile";

    return (
    <div>
      <ProductProvider>
        {!hideLayout && (
        <>
            <Header toggleCart={() => { setIsCartOpen(prev => { console.log("Toggling cart, isCartOpen:", !prev); return !prev; }); }} />
            <Navbar />
            {isCartOpen && (
  <>
    <div
      className="cart-overlay"
      onClick={() => setIsCartOpen(false)}
    />
    <div className={`cart-drawer ${isCartOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  </>
)}
 </>
)}

        
        <Routes>
            <Route path="/login" element={<Login key="login" isRegistered={true}/>} className="container"/>
            <Route path="/register" element={<Login key="register" isRegistered={false}/>} className="container"/>
            
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route 
            path="/order" 
            element={
            <ProtectedRoutes>
              <Orders />
              </ProtectedRoutes>
            } 
            />
            <Route path="/profile" element={<Profile />} />
        </Routes>
        {!hideLayout && (
        <>
        <ProductSection />
          <About />
          <Footer />
        </>
      )}
    </ProductProvider>


        

    </div>
    );
};

export default App;