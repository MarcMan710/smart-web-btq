import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Updated import
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authState } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                authState.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" /> // Updated from Redirect to Navigate
                )
            }
        />
    );
};

export default PrivateRoute;