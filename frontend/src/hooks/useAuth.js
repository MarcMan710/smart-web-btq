// frontend/src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
    const { authState, login, logout } = useContext(AuthContext);

    return {
        authState,
        login,
        logout,
    };
};

export default useAuth;