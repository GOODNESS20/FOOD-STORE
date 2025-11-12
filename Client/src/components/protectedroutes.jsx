// client/src/components/ProtectedRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProduct } from '../ProductContext/productcontext';
import {jwtDecode} from "jwt-decode";

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem('token');
  console.log("ProtectedRoutes token:", token);

  const { loginUser } = useProduct();

  // If no token → go to login
  if (!token) return <Navigate to= "/login" />;

  try {
    const decoded = jwtDecode(token);
    //const { setUser } = useProduct();
    loginUser(decoded);
    return children;
  } catch (error) {
    console.error("Token decode failed:", error)
    localStorage.removeItem("token");
    return <Navigate to= "/login" />;
  }

  // If token → show the page
}

export default ProtectedRoutes;