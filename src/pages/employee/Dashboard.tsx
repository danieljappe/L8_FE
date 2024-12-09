// src/components/HomePage.tsx

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store';
import  '../../assets/styles/pages/_dashboard.scss'
import {clearAuth} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";

import Sidebar from "./dashboard_components/Sidebar"
import DashboardContent from "./dashboard_components/DashboardContent"
import Profile from "./dashboard_components/Profile"
import DashboardEvents from "./dashboard_components/DashboardEvents"
import DashboardArtist from "./dashboard_components/DashboardArtist"
import DashboardAboutUs from "./dashboard_components/DashboardAboutUs";

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const token = useSelector((state: RootState) => state.auth.token);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleLogout = () => {
        dispatch(clearAuth());
        alert("You have logged out")
        navigate("/")
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardContent />;
            case 'profile':
                return <Profile />;
            case 'DashboardEvents':
                return <DashboardEvents />;
            case 'DashboardArtist':
                return <DashboardArtist />;
            case 'DashboardAbout':
                return <DashboardAboutUs />
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="dashboard">
            <section>
                <div className="dashboard-layout">
                    <Sidebar setActiveTab={setActiveTab} handleLogout={handleLogout} />
                    <div className="content">
                        {renderContent()}
                    </div>
                </div>
            </section>
        </div>
    );

};

export default Dashboard;