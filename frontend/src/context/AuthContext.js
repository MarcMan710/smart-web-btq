// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        isAuthenticated: false,
        role: localStorage.getItem('role') || sessionStorage.getItem('role') || null,
    });

    useEffect(() => {
        if (authState.token) {
            setAuthState({ ...authState, isAuthenticated: true });
        }
    }, [authState.token]);

    const login = (token, rememberMe, role) => {
        if (rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
        } else {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
        }
        setAuthState({ token, isAuthenticated: true, role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('role');
        sessionStorage.removeItem('role');
        setAuthState({ token: null, isAuthenticated: false, role: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;