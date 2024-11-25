import React from 'react';
import {useSelector} from "react-redux";

const DashboardContent: React.FC = () => {
    const user = useSelector((state: any) => state.auth.user);

    return (
        <div>
            <h1>Dashboard Overview</h1>
            <h1>Welcome, {user.firstName} {user.lastName}!</h1>
            <p>Welcome to the admin dashboard.</p>
        </div>
    );
};

export default DashboardContent;
