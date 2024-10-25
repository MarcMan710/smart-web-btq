import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        return {
            token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
            isAuthenticated: false,
        };
    });

    useEffect(() => {
        if (authState.token) {
            setAuthState((prevState) => ({ ...prevState, isAuthenticated: true }));
        }
    }, [authState.token]);

    const login = useCallback((token, rememberMe) => {
        if (rememberMe) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }
        setAuthState({ token, isAuthenticated: true });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setAuthState({ token: null, isAuthenticated: false });
    }, []);

    const authContextValue = useMemo(() => ({ authState, login, logout }), [authState, login, logout]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;