import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthContextProps {
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(() => {
        // Load token from localStorage/sessionStorage if needed
        return localStorage.getItem('jwt') || null;
    });

    const setToken = useCallback((newToken: string) => {
        setTokenState(newToken);
        localStorage.setItem('jwt', newToken); // Store in localStorage (adjust as needed)
    }, []);

    const removeToken = useCallback(() => {
        setTokenState(null);
        localStorage.removeItem('jwt'); // Clear token from storage
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
