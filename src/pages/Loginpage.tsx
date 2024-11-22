import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser, clearAuth } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../assets/styles/pages/_loginpage.scss"

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setToken(data.token)); // Save the token in Redux
                dispatch(setUser(data.user)); // Save user in Redux
                navigate('/dashboard');
            } else {
                const errorData = await response.json()
                setError(errorData.message || 'Internal error')

            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="loginpage">
            <section>
                <form onSubmit={handleLogin} className="login-form">
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
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
