import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from '../service/auth';

const AuthContext = createContext();// 👈 create a context for authentication

// 👈 create a provider component
export const AuthProvider = ({ children }) => {

    const logout = () => {
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('token');
       // window.location.href = '/login';
    };

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('tokenExpiry');
        console.log(token);
        console.log(expiry);

        if (!token || !expiry || Date.now() > Number(expiry)) {
            //logout();
            return false;
        }

        return true;
    };

    // 👈 state to manage authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

    const startAutoLogoutTimer = () => {
        const expiry = Number(localStorage.getItem('tokenExpiry'));
        const remainingTime = expiry - Date.now();

        if (remainingTime > 0) {
            setTimeout(() => {
                logout();
            }, remainingTime);
        } else {
            logout();
        }
    };

    const Authlogin = async (response) => {
        console.log(response.data);
        const { token, tokenExpiresAt } = response.data;
        const expiryTime = Date.now() + tokenExpiresAt * 1000;
        localStorage.setItem('token', response.token);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
    };


    // 👈 useEffect to check authentication status on mount
    useEffect(() => {
        if (isAuthenticated) {
            console.log(isAuthenticated);
            startAutoLogoutTimer();
        }
         console.log(isAuthenticated);
    }, [isAuthenticated]);

    // 👈 return the context provider with the authentication state and functions
    return (
        <AuthContext.Provider value={{ isAuthenticated, Authlogin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// 👈 create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
