// frontend/src/pages/Levels.js
import React, { useEffect } from 'react';
import useLevel from '../hooks/useLevel';
import levelService from '../services/levelService'; // Add this import

const Levels = () => {
    const { levels, setLevels } = useLevel();

    useEffect(() => {
        // Fetch levels on component mount
        const fetchLevels = async () => {
            const data = await levelService.fetchLevels();
            setLevels(data);
        };

        fetchLevels();
    }, []);

    return (
        <div>
            <h2>Available Levels</h2>
            <ul>
                {levels.map((level) => (
                    <li key={level._id}>{level.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Levels;