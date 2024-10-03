// frontend/src/pages/LevelDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import levelService from '../services/levelService';

const LevelDetails = () => {
    const { levelId } = useParams();
    const [levelDetails, setLevelDetails] = useState(null);

    useEffect(() => {
        const fetchLevelDetails = async () => {
            const data = await levelService.fetchLevelById(levelId);
            setLevelDetails(data);
        };

        fetchLevelDetails();
    }, [levelId]);

    if (!levelDetails) return <div>Loading...</div>;

    return (
        <div>
            <h2>{levelDetails.name}</h2>
            <p>{levelDetails.description}</p>
            {/* Add more details as necessary */}
        </div>
    );
};

export default LevelDetails;
