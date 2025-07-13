import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();// 👈 create a context for authentication

// 👈 create a provider component
export const AuthProvider = ({ children }) => {

    // 👈 state to manage authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    // 👈 useEffect to check authentication status on mount
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
           // setIsAuthenticated(true);
        }
    }, []);

    // 👈 return the context provider with the authentication state and functions
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// 👈 create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
