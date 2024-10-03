// frontend/src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthContext from './AuthContext';
import useFetch from '../hooks/useFetch';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const fetchUserData = useFetch('/api/users/profile');

    useEffect(() => {
        if (authState.isAuthenticated) {
            fetchUserData().then((data) => setUserData(data));
        }
    }, [authState]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
