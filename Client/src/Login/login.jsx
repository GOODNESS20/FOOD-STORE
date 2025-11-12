import React from "react";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useProduct } from "../ProductContext/productcontext";
import './Login.css';
import axios from 'axios';
import { Link } from "react-router-dom";


function Login ({ isRegistered }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = isRegistered ? '/api/login' : '/api/register';
            const payload = isRegistered
            ? { username, password}
            : {username, password, confirmPassword};
            const response = await axios.post(endpoint, payload);
            const {token, redirectTo } = response.data;
            
            if (token) {
            localStorage.setItem('token', token);
            navigate(redirectTo || "/order", {replace: true});
        }
        } catch (err) {
            setError(err.response?.data?.error || err.message ||'An error occurred');
        }
    };
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h2>{isRegistered ? "Login" : "Register"}</h2>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                {!isRegistered && (<input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>)}
                {error && <p className="error">{error}</p>}
                <button type="submit"> 
                {isRegistered ? "Login" : "Register"}
                </button>

                <p className="toggle-text">
                    {isRegistered ? "Don't have an account? " : "Already have an account "}
                    <Link to={isRegistered ? "/register" : "/login"}>
                         {isRegistered ? "Register here" : "Login here"}
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login;