import { Middleware } from "@reduxjs/toolkit";
import { clearAuth } from "./authSlice"; // Import the clearAuth action
import { RootState } from "./index"; // Adjust the path to your store

export const tokenExpirationMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    // Access the current state
    const state: RootState = store.getState();
    const token = state.auth.token;

    if (token) {
        const decodeToken = (token: string): { exp?: number } | null => {
            try {
                const payload = token.split(".")[1];
                return JSON.parse(atob(payload));
            } catch {
                return null;
            }
        };

        const isTokenExpired = (exp?: number): boolean => {
            if (!exp) return false;
            const now = Math.floor(Date.now() / 1000);
            return exp < now;
        };

        const decoded = decodeToken(token);
        if (decoded?.exp && isTokenExpired(decoded.exp)) {
            store.dispatch(clearAuth()); // Clear token from Redux
            alert("Your session has expired. Please log in again.");
        }
    }

    return result;
};
