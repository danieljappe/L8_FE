import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.auth.token); // Access token from Redux state

    // If no token, redirect to login
    return token ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
