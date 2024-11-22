// src/components/HomePage.tsx

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store';
import  '../../assets/styles/pages/_dashboard.scss'
import {clearAuth} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const token = useSelector((state: RootState) => state.auth.token);
    const user = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        const fetchProtectedData = async () => {
            if (!token) return;

            try {
                const response = await fetch('http://localhost:5000/api/users/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await response.json();
                console.log('Protected data:', data);
            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };

        fetchProtectedData();
    }, [token]);

    const handleLogout = () => {
        dispatch(clearAuth());
        alert("You have logged out")
        navigate("/")
    }

    return (

        <div className="dashboard">
            <section>
                <div className="title-container">
                    <div>
                        <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                        <p>Id: {user.id} </p>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                    </div>
                    <h2>Token:</h2>
                    <p>${token}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;