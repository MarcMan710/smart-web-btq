// frontend/src/context/HafalanContext.js
import React, { createContext, useState, useEffect } from 'react';
import hafalanService from '../services/hafalanService';

const HafalanContext = createContext();

export const HafalanProvider = ({ children }) => {
    const [hafalanList, setHafalanList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { fetchHafalan } = hafalanService();

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
    }, [fetchHafalan]);

    return (
        <HafalanContext.Provider value={{ hafalanList, setHafalanList, loading, error }}>
            {children}
        </HafalanContext.Provider>
    );
};

export default HafalanContext;