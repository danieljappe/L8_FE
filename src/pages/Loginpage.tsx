import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';
import {useHref} from "react-router-dom";

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../assets/styles/pages/_loginpage.scss"

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setToken(data.token)); // Save the token in Redux
                alert('Login successful!');
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="loginpage">
            <section>
                <form onSubmit={handleLogin}>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
            </section>
        </div>
    );
};

export default LoginPage;
