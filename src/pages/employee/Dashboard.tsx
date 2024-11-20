// src/components/HomePage.tsx

import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import  '../../assets/styles/pages/_dashboard.scss'

const Dashboard: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);

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

    return (

        <div className="dashboard">
            <h1>Protected Content</h1>
            <h2>Token:</h2>
            <p>${token}</p>
        </div>);
};

export default Dashboard;