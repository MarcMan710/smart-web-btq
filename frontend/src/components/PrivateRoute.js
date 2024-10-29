import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "./Spinner";

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the token is present and set the loading state accordingly
    if (authState.token) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [authState.token]);

  if (isLoading) {
    // Optionally, you can return a loading spinner or similar component here
    return <Spinner loading={true} />;
  }

  if (!authState.isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Render the children if authenticated
  return children;
};

export default PrivateRoute;
