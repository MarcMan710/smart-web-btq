// frontend/src/context/HafalanContext.js
import React, { createContext, useState, useEffect } from 'react';
import hafalanService from '../services/hafalanService';

const HafalanContext = createContext();

export const HafalanProvider = ({ children }) => {
    const [hafalanList, setHafalanList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ensure hafalanService is correctly imported and used
    const fetchHafalan = hafalanService.fetchHafalan;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchHafalan();
                setHafalanList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <HafalanContext.Provider value={{ hafalanList, loading, error }}>
            {children}
        </HafalanContext.Provider>
    );
};

export default HafalanContext;