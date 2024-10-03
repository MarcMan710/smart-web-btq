// frontend/src/hooks/useFetch.js
import { useState } from 'react';
import useAuth from './useAuth';

const useFetch = (url, options = {}) => {
    const { authState } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${authState.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return { fetchData, loading, error };
};

export default useFetch;
