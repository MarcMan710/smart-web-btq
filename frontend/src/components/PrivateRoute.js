import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);

    if (!authState.isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" />;
    }

    // Render the children if authenticated
    return children;
};

export default PrivateRoute;