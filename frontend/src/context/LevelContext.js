// frontend/src/context/LevelContext.js
import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
    const [levels, setLevels] = useState([]);
    const fetchLevels = useFetch('/api/levels');

    useEffect(() => {
        fetchLevels().then((data) => setLevels(data));
    }, []);

    return (
        <LevelContext.Provider value={{ levels, setLevels }}>
            {children}
        </LevelContext.Provider>
    );
};

export default LevelContext;
