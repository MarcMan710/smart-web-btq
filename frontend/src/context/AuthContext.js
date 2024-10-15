import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        isAuthenticated: false,
    });

    useEffect(() => {
        if (authState.token) {
            setAuthState({ ...authState, isAuthenticated: true });
        }
    }, [authState.token]);

    const login = (token, rememberMe) => {
        if (rememberMe) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }
        setAuthState({ token, isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setAuthState({ token: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;