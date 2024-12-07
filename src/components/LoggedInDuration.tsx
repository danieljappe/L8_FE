import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../store"; // Adjust the path based on your setup
import { clearAuth } from "../store/authSlice";
import {useNavigate} from "react-router-dom";

const decodeToken = (token: string): { iat?: number; exp?: number } | null => {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

const calculateDuration = (iat: number): string => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const durationInSeconds = now - iat;

    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
};

const isTokenExpired = (exp?: number): boolean => {
    if (!exp) return false; // If no expiration field, assume it's not expired
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return exp < now; // Expired if `exp` is in the past
};

const calculateTimeUntilExpiration = (exp: number): string => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const remainingTime = exp - now;

    if (remainingTime <= 0) {
        return "Expired";
    }

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
};

const LoggedInDuration: React.FC = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const [duration, setDuration] = useState<string>("");

    useEffect(() => {
        if (!token) return;

        const decoded = decodeToken(token);
        if (!decoded?.iat || !decoded.exp) return;

        if (isTokenExpired(decoded.exp)) {
            console.log("Token expired.");
            alert("Your session has expired. Please log in again.");
            dispatch(clearAuth())
            navigate("/")
            return;
        }

        const updateDuration = () => {
            const newDuration = calculateDuration(decoded.iat as number);
            const timeUntilExpiration = calculateTimeUntilExpiration(decoded.exp as number);
            console.log("Token until expiration: ", timeUntilExpiration);
            setDuration(newDuration);
        };

        // Update duration and log every second
        const interval = setInterval(updateDuration, 1000);

        return () => clearInterval(interval);
    }, [token]);

    if (!token) {
        return <p>You are not logged in.</p>;
    }

    return (
        <div>
            <p>Logged in for: {duration}</p>
        </div>
    );
};

export default LoggedInDuration;
